import { useState, useRef } from "react";
import Stepper, { Step } from "./Stepper";
import ServiceButton from "./serviceButton";
import Image from 'next/image';
import { servicePackages } from "@/lib/servicePackages";
// icons
import email from "@/public/icons/email.svg";

type RequestFormData = {
    solution: string;
    service: string;
    package: string;
    details: string;
    email: string;
};

interface SuccessScreenProps {
    data: RequestFormData;
    onNewRequest: () => void;
}

const SuccessScreen = ({ data, onNewRequest }: SuccessScreenProps) => {
    const formatLabel = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full p-8 lg:p-14 rounded-[20px] border-b-2 border-r border-[#E2E8F02E] bg-[#4848481A] backdrop-blur-[19px]">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#89CF8033] flex items-center justify-center" style={{ boxShadow: 'box-shadow: 0 0 250px 0 rgba(76, 175, 80, 0.30)' }}>
                    <svg className="w-8 h-8 text-[#89CF80]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="font-fraunces text-white text-3xl text-center">Success!</h2>
                <p className="font-jakarta text-neutral-400 text-center max-w-md">Thank you for your submission. Your request has been submitted successfully. <br /> We'll get back to you soon!</p>
            </div>

            <div className="w-full max-w-md p-6 bg-[#FFFFFF0A] border border-[#E2E8F02E] rounded-[20px] backdrop-blur-sm space-y-4">
                <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-between">
                    <p className="font-jakarta text-[#D7B783] text-sm tracking-wider mb-1">Solution</p>
                    <p className="font-jakarta text-neutral-400 text-sm">{formatLabel(data.solution)}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-between">
                    <p className="font-jakarta text-[#D7B783] text-sm tracking-wider mb-1">Service</p>
                    <p className="font-jakarta text-neutral-400 text-sm">{data.service}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-between">
                    <p className="font-jakarta text-[#D7B783] text-sm tracking-wider mb-1">Package</p>
                    <p className="font-jakarta text-neutral-400 text-sm">{data.package}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-between">
                    <p className="font-jakarta text-[#D7B783] text-sm tracking-wider mb-1">Email</p>
                    <p className="font-jakarta text-neutral-400 text-sm">{data.email}</p>
                </div>
            </div>

            <button
                onClick={onNewRequest}
                className="flex items-center justify-center gap-2 rounded-full bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] border border-[#E2E8F02E] p-2 lg:px-3 transition duration-350 text-neutral-400"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <p className="font-jakarta text-xs leading-3 font-normal uppercase tracking-[1.2px]">SUBMIT NEW REQUEST</p>
            </button>
        </div>
    );
}

const ProjectForm = () => {

    const lang = "en";
    console.log('rendered');

    const [data, setData] = useState<RequestFormData>({
        solution: "",
        service: "",
        package: "",
        details: "",
        email: ""
    });

    const [step, setStep] = useState(1);
    const [submittedData, setSubmittedData] = useState<null | RequestFormData>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const handleNextRef = useRef<(() => void) | undefined>(undefined);

    // Email validation regex
    const isEmailValid = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(data.email);

    const handleReset = () => {
        setStep(1);
        setSubmittedData(null);
        setSubmitError(null);
        setIsSubmitting(false);
        setData({
            solution: "",
            service: "",
            package: "",
            details: "",
            email: ""
        });
    };

    const handleSubmitRequest = async () => {
        if (!isEmailValid) {
            setSubmitError("Please enter a valid email address.");
            return false;
        }

        setSubmitError(null);
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let payload: unknown = null;
            try {
                payload = await res.json();
            } catch {
                payload = null;
            }

            if (!res.ok) {
                const errorValue =
                    typeof payload === "object" && payload !== null && "error" in payload
                        ? (payload as { error?: unknown }).error
                        : null;

                const backendMessage =
                    typeof errorValue === "string"
                        ? errorValue
                        : typeof errorValue === "object" && errorValue !== null && "message" in errorValue
                            ? String((errorValue as { message?: unknown }).message ?? "Failed to submit your request. Please try again.")
                            : "Failed to submit your request. Please try again.";

                setSubmitError(backendMessage);
                return false;
            }

            setSubmittedData(data);
            return true;
        } catch {
            setSubmitError("Network error while submitting. Please try again.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-auto w-full items-center justify-center p-10">
            {submittedData ? (
                <div className="w-[356px] lg:w-[640px]">
                    <SuccessScreen data={submittedData} onNewRequest={handleReset} />
                </div>
            ) : (
                <div className="w-full flex-col items-center justify-center gap-8 flex">
                    <Stepper
                        initialStep={step}
                        className='w-[356px] lg:w-[640px] text-white'
                        stepCircleContainerClassName="w-full py-8 px-6 lg:py-12 lg:px-8 rounded-[20px] border-b-[2px] border-r-[1px] border-[#E2E8F02E] bg-[#4848481A] backdrop-blur-[6px]"
                        onStepChange={(newStep) => setStep(newStep)}
                        onFinalStepCompleted={handleSubmitRequest}
                        backButtonText="BACK"
                        nextButtonText={isSubmitting ? "SUBMITTING..." : "CONTINUE"}
                        nextButtonProps={{ disabled: isSubmitting }}
                        onNextStepRef={(fn) => { handleNextRef.current = fn; }}
                        isEmailValid={isEmailValid}
                    >
                        <Step>
                            <h2 className="font-fraunces text-white text-2xl text-center">I. Select a Solution</h2>
                            <p className="font-jakarta text-[16px] text-neutral-400 text-center">Choose the area that best fits your project's needs.</p>
                            <div className="flex flex-wrap items-center justify-center w-full lg:w-[80%] lg:mx-auto lg gap-2 mt-9 mb-6 lg:mt-12">
                                {[...Object.keys(servicePackages[lang])].map((solutionKey) => (
                                    <ServiceButton
                                        key={solutionKey}
                                        text={solutionKey.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                        selected={data.solution === solutionKey}
                                        onClick={() => {
                                            setData({ ...data, solution: solutionKey, service: '', package: '' });
                                            if (handleNextRef.current) handleNextRef.current();
                                        }}
                                    />
                                ))}
                            </div>
                        </Step>
                        <Step>
                            <h2 className="font-fraunces text-white text-2xl text-center">II. Select a Service</h2>
                            <p className="font-jakarta text-[16px] text-neutral-400 text-center">Exploring services for {servicePackages[lang][data.solution]?.name ?? data.solution.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                            <div className="flex flex-wrap w-full lg:w-[80%] lg:mx-auto gap-2 mt-9 mb-6 lg:mt-12">
                                {data.solution && servicePackages[lang][data.solution] ? (
                                    Object.keys(servicePackages[lang][data.solution].services).map((svcName) => (
                                        <ServiceButton
                                            key={svcName}
                                            text={svcName}
                                            selected={data.service === svcName}
                                            onClick={() => {
                                                setData({ ...data, service: svcName, package: '' });
                                                if (handleNextRef.current) handleNextRef.current();
                                            }}
                                        />
                                    ))
                                ) : (
                                    <p className="font-jakarta text-[16px] text-neutral-400 text-center">Please select a solution first.</p>
                                )}
                            </div>
                        </Step>
                        <Step>
                            <h2 className="font-fraunces text-white text-2xl text-center">III. Select a Package</h2>
                            <p className="font-jakarta text-[16px] text-neutral-400 text-center">Refining your request for {data.service}</p>
                            <div className="flex flex-wrap w-full gap-2 mt-9 mb-6 lg:mt-12">
                                {data.solution && data.service && servicePackages[lang][data.solution] ? (
                                    (servicePackages[lang][data.solution].services[data.service]?.packages || []).map((pkg) => (
                                        <ServiceButton
                                            key={pkg.name}
                                            text={pkg.name}
                                            pckge={true}
                                            price={pkg.price}
                                            selected={data.package === pkg.name}
                                            onClick={() => {
                                                setData({ ...data, package: pkg.name + (pkg.price ? ` - $${pkg.price}` : '') });
                                                if (handleNextRef.current) handleNextRef.current();
                                            }}
                                        />
                                    ))
                                ) : (
                                    <p className="font-jakarta text-[16px] text-neutral-400 text-center">Please select a solution and service first.</p>
                                )}
                            </div>
                        </Step>
                        <Step>
                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="font-fraunces text-white text-2xl text-center mb-2">IV. Share Your Ideas</h2>
                                <p className="font-jakarta text-[16px] text-neutral-400 text-center">A quick note is enough to get us started.</p>
                                <div className="mt-9 mb-5 lg:mt-12 p-4 w-full max-w-[400px] min-h-40 flex flex-col items-start bg-[#FFFFFF0A] border border-[#E2E8F02E] rounded-[20px] backdrop-blur-sm">
                                    <textarea
                                        className="w-full h-full font-jakarta text-[#F0F0F2] placeholder:text-neutral-500 text-[16px] leading-5 tracking-[-0.28px] resize-none bg-transparent outline-none"
                                        value={data.details}
                                        onChange={(e) => setData({ ...data, details: e.target.value })}
                                        placeholder="Describe your project, goals, timeline, or any specific requirements..."
                                    />
                                </div>
                            </div>
                        </Step>
                        <Step>
                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="font-fraunces text-white text-2xl text-center mb-2">V. Share Your Email</h2>
                                <p className="font-jakarta text-[16px] text-neutral-400 text-center mb-6">We'll send you a proposal shortly.</p>
                                <div className="flex items-center justify-between mt-9 mb-5 lg:mt-12 p-4 w-full lg:w-[80%] h-full bg-[#FFFFFF0A] border border-[#E2E8F02E] rounded-[20px] backdrop-blur-sm ">
                                    <input className="w-[90%] font-jakarta text-neutral-500 text-[16px] leading-5 tracking-[-0.28px] outline-none" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="your-email@company.com" />
                                    <Image src={email} alt="Email Icon" width={20} height={20} className="" />
                                </div>
                            </div>
                        </Step>
                    </Stepper>
                    {submitError && (
                        <p className="mt-4 max-w-[640px] text-center font-jakarta text-sm text-red-300">
                            {submitError}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProjectForm