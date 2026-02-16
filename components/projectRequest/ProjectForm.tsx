import { useState, useRef } from "react";
import Stepper, { Step } from "./Stepper";
import ServiceButton from "./serviceButton";

type PackageItem = {
    name: string;
    price: string;
    features: string[];
};

type ServiceData = {
    color: string;
    services: Record<string, PackageItem[]>; // map of service name -> its packages
};

const ProjectForm = () => {

    const servicePackages: Record<string, ServiceData> = {
        consulting: {
            color: "#662221",
            services: {
                Consulting: [
                    { name: "START", price: "250$", features: ["Initial assessment", "Strategy session"] },
                    { name: "GROWTH", price: "400-500$", features: ["Comprehensive plan", "Implementation support"] },
                    { name: "LAUNCH", price: "700-900$", features: ["Full service", "Dedicated team"] },
                    { name: "PREMIUM", price: "1000-1300$", features: ["All-inclusive", "24/7 support"] }
                ]
            }
        },
        "digital-marketing": {
            color: "#041A2F",
            services: {
                "Social Media Management": [
                    { name: "STANDARD", price: "600$ + 250$", features: ["Social media setup", "Basic content creation", "22 posts/month"] },
                    { name: "ADVANCED", price: "900$ + 300$", features: ["Comprehensive strategy", "Advanced content creation", "34 posts/month"] },
                    { name: "PREMIUM", price: "1500$ + 350$", features: ["Full platform management", "Premium content creation", "45 posts/month"] }
                ],
                "Graphic Design & Branding": [
                    { name: "STANDARD", price: "600$ + 250$", features: ["Logo & identity", "Basic brand kit"] },
                    { name: "ADVANCED", price: "900$ + 300$", features: ["Extended guidelines", "Packaging mockups"] },
                    { name: "PREMIUM", price: "1500$ + 350$", features: ["Full branding system", "Art direction"] }
                ],
                "Photo & Video Production": [
                    { name: "STANDARD", price: "600$ + 250$", features: ["Half-day shoot", "Basic editing"] },
                    { name: "ADVANCED", price: "900$ + 300$", features: ["Full-day shoot", "Advanced editing"] },
                    { name: "PREMIUM", price: "1500$ + 350$", features: ["Cinematic production", "Post-production"] }
                ],
                "Content Marketing & Editorial Strategy": [
                    { name: "STANDARD", price: "600$ + 250$", features: ["Content calendar", "Basic copywriting"] },
                    { name: "ADVANCED", price: "900$ + 300$", features: ["Multi-channel content", "SEO-aware copy"] },
                    { name: "PREMIUM", price: "1500$ + 350$", features: ["Full editorial program", "Long-form production"] }
                ]
            }
        },
        "it-solutions": {
            color: "#2A382B",
            services: {
                "IT Management": [
                    { name: "BASIC", price: "500$", features: ["System assessment", "Basic setup"] },
                    { name: "STANDARD", price: "800$", features: ["Customized solutions", "Ongoing support"] },
                    { name: "ENTERPRISE", price: "1200$", features: ["Comprehensive IT management", "Dedicated support team"] }
                ]
            }
        },
        "ads-management": {
            color: "#31271E",
            services: {
                "Ads Management": [
                    { name: "STANDARD", price: "250$ + ad spend", features: ["Ad setup", "Basic monitoring"] },
                    { name: "ADVANCED", price: "400$ + ad spend", features: ["Comprehensive management", "Performance reports"] },
                    { name: "PREMIUM", price: "600$ + ad spend", features: ["Full-service management", "Advanced analytics"] }
                ]
            }
        }
    };

    const [data, setData] = useState<{
        solution: string,
        service: string,
        package: string,
        details: string,
        email: string
    }>({
        solution: "",
        service: "",
        package: "",
        details: "",
        email: ""
    });

    const [step, setStep] = useState(1);
    const handleNextRef = useRef<(() => void) | undefined>(undefined);

    return (
        <div className="flex w-full items-center justify-center p-10">
            <Stepper
                initialStep={step}
                className='w-[356px] py-8 px-6 lg:w-[560px] lg:py-12 lg:px-8 rounded-[20px] text-white'
                onStepChange={(newStep) => setStep(newStep)}
                onFinalStepCompleted={() => alert(`Thank you for your submission! We will get back to you soon.`)}
                backButtonText="BACK"
                nextButtonText="CONTINUE"
                onNextStepRef={(fn) => { handleNextRef.current = fn; }}
            >
                <Step>
                    <h2 className="font-fraunces text-white text-2xl text-center">I. Select a Solution</h2>
                    <p className="font-jakarta text-sm text-neutral-400 text-center">Choose the area that best fits your project's needs.</p>
                    <div className="flex flex-wrap w-full gap-2 mt-4">
                        {[...Object.keys(servicePackages)].map((solutionKey) => (
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
                    <p className="font-jakarta text-sm text-neutral-400 text-center">Exploring services for {data.solution.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                    <div className="flex flex-wrap w-full gap-2 mt-4">
                        {data.solution && servicePackages[data.solution] ? (
                            Object.keys(servicePackages[data.solution].services).map((svcName) => (
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
                            <p className="font-jakarta text-sm text-neutral-400 text-center">Please select a solution first.</p>
                        )}
                    </div>
                </Step>
                <Step>
                    <h2 className="font-fraunces text-white text-2xl text-center">III. Select a Package</h2>
                    <p className="font-jakarta text-sm text-neutral-400 text-center">Refining your request for {data.service.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                    <div className="flex flex-wrap w-full gap-2 mt-4">
                        {data.solution && data.service && servicePackages[data.solution] ? (
                            (servicePackages[data.solution].services[data.service] || []).map((pkg) => (
                                <ServiceButton
                                    key={pkg.name}
                                    text={pkg.name}
                                    price={pkg.price}
                                    selected={data.package === pkg.name}
                                    onClick={() => {
                                        setData({ ...data, package: pkg.name });
                                        if (handleNextRef.current) handleNextRef.current();
                                    }}
                                />
                            ))
                        ) : (
                            <p className="font-jakarta text-sm text-neutral-400 text-center">Please select a solution and service first.</p>
                        )}
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <h2 className="font-fraunces text-white text-2xl text-center">IV. Share Your Ideas</h2>
                        <p className="font-jakarta text-sm text-neutral-400 text-center">A quick note is enough to get us started.</p>
                        <input className="p-4 w-full min-h-40 bg-[#FFFFFF0A] border border-[#E2E8F02E] rounded-[20px] backdrop-blur-sm font-jakarta text-neutral-500 text-sm leading-5 tracking-[-0.28px]" value={data.details} onChange={(e) => setData({ ...data, details: e.target.value })} placeholder="| Describe your project, goals, timeline, or any specific requirements..." />
                    </div>
                </Step>
                <Step>
                    <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <h2 className="font-fraunces text-white text-2xl text-center">V. Share Your Email</h2>
                        <p className="font-jakarta text-sm text-neutral-400 text-center mb-6">We'll send you a proposal shortly.</p>
                        <input className="p-4 w-full h-full bg-[#FFFFFF0A] border border-[#E2E8F02E] rounded-[20px] backdrop-blur-sm font-jakarta text-neutral-500 text-sm leading-5 tracking-[-0.28px]" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="your-email@company.com" />
                    </div>
                </Step>
            </Stepper>
        </div>
    )
}

export default ProjectForm