import { useState } from "react";
import Stepper, { Step } from "./Stepper";

type PackageItem = {
    name: string;
    price: string;
    features: string[];
};

type ServiceData = {
    color: string;
    packages: PackageItem[];
};

const ProjectForm = () => {

    const servicePackages: Record<string, ServiceData> = {
        "consulting": {
            color: "#662221",
            packages: [
                { name: "START", price: "250$", features: ["Initial assessment", "Strategy session"] },
                { name: "GROWTH", price: "400-500$", features: ["Comprehensive plan", "Implementation support"] },
                { name: "LAUNCH", price: "700-900$", features: ["Full service", "Dedicated team"] },
                { name: "PREMIUM", price: "1000-1300$", features: ["All-inclusive", "24/7 support"] }
            ]
        },
        "digital-marketing": {
            color: "#041A2F",
            packages: [
                { name: "STANDARD", price: "600$ + 250$", features: ["Social media setup", "Basic content creation", "22 posts/month"] },
                { name: "ADVANCED", price: "900$ + 300$", features: ["Comprehensive strategy", "Advanced content creation", "34 posts/month"] },
                { name: "PREMIUM", price: "1500$ + 350$", features: ["Full platform management", "Premium content creation", "45 posts/month"] }
            ]
        },
        "it-solutions": {
            color: "#2A382B",
            packages: [
                { name: "BASIC", price: "500$", features: ["System assessment", "Basic setup"] },
                { name: "STANDARD", price: "800$", features: ["Customized solutions", "Ongoing support"] },
                { name: "ENTERPRISE", price: "1200$", features: ["Comprehensive IT management", "Dedicated support team"] }
            ]
        },
        "ads-management": {
            color: "#31271E",
            packages: [
                { name: "STANDARD", price: "250$ + ad spend", features: ["Ad setup", "Basic monitoring"] },
                { name: "ADVANCED", price: "400$ + ad spend", features: ["Comprehensive management", "Performance reports"] },
                { name: "PREMIUM", price: "600$ + ad spend", features: ["Full-service management", "Advanced analytics"] }
            ]
        }
    };

    const [data, setData] = useState<{
        service: string,
        package: string,
        details: string,
        email: string
    }>({
        service: "",
        package: "",
        details: "",
        email: ""
    });

    return (
        <div className="flex w-full items-center justify-center p-10">
            <Stepper
                initialStep={1}
                className='w-80 font-main'
                onStepChange={(step) => {
                    console.log(step);
                }}
                onFinalStepCompleted={() => alert(`Thank you for your submission! We will get back to you soon.`)}
                backButtonText="Previous"
                nextButtonText="Next"
            >
                <Step>
                    <h2>Select one of our services:</h2>
                    <div className="flex flex-wrap w-full">
                        {[...Object.keys(servicePackages)].map((serviceKey) => (
                            <button
                                key={serviceKey}
                                className={`m-2 rounded-full ${data.service === serviceKey ? 'bg-[#89CF80]' : 'bg-[#2A382B]'}  py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-[#89CF80] cursor-pointer active:bg-[#89CF80]`}
                                onClick={() => { setData({ ...data, service: serviceKey.toString() }) }}
                            >
                                {serviceKey.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </Step>
                <Step>
                    <h2>Select one of our packages for {data.service}</h2>
                    <div className="flex flex-wrap w-full">
                        {data.service && servicePackages[data.service] ? (
                            servicePackages[data.service].packages.map((pkg) => (
                                <button
                                    key={pkg.name}
                                    className={`m-2 rounded-full ${data.package === pkg.name ? 'bg-[#89CF80]' : 'bg-[#2A382B]'}  py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-[#89CF80] cursor-pointer active:bg-[#89CF80]`}
                                    onClick={() => { setData({ ...data, package: pkg.name }) }}
                                >
                                    {pkg.name} - {pkg.price}
                                </button>
                            ))
                        ) : (
                            <p>Please select a service first.</p>
                        )}
                    </div>
                </Step>
                <Step>
                    <h2>Tell us about your ideas</h2>
                    <input className="p-2" value={data.details} onChange={(e) => setData({...data, details: e.target.value})} placeholder="What's on your mind?" />
                </Step>
                <Step>
                    <h2>Final Step</h2>
                    <input className="p-2" type="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} placeholder="Your email address" />
                </Step>
            </Stepper>
        </div>
    )
}

export default ProjectForm