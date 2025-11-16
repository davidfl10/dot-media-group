import ServiceClient from "@/components/ServiceClient";


const servicePackages: Record<string, any[]> = {
    consulting: [
        { name: "START", price: "250$", features: ["Initial assessment", "Strategy session"] },
        { name: "GROWTH", price: "400-500$", features: ["Comprehensive plan", "Implementation support"] },
        { name: "LAUNCH", price: "700-900$", features: ["Full service", "Dedicated team"] },
        { name: "PREMIUM", price: "1000-1300$", features: ["All-inclusive", "24/7 support"] }
    ],
    "digital-marketing": [
        { name: "STANDARD", price: "600$ + 250$", features: ["Social media setup", "Basic content creation", "22 posts/month"] },
        { name: "ADVANCED", price: "900$ + 300$", features: ["Comprehensive strategy", "Advanced content creation", "34 posts/month"] },
        { name: "PREMIUM", price: "1500$ + 350$", features: ["Full platform management", "Premium content creation", "45 posts/month"] }
    ],
    "it-solutions": [
        { name: "BASIC", price: "500$", features: ["System assessment", "Basic setup"] },
        { name: "STANDARD", price: "800$", features: ["Customized solutions", "Ongoing support"] },
        { name: "ENTERPRISE", price: "1200$", features: ["Comprehensive IT management", "Dedicated support team"] }
    ],
    "ads-management": [
        { name: "STANDARD", price: "250$ + ad spend", features: ["Ad setup", "Basic monitoring"] },
        { name: "ADVANCED", price: "400$ + ad spend", features: ["Comprehensive management", "Performance reports"] },
        { name: "PREMIUM", price: "600$ + ad spend", features: ["Full-service management", "Advanced analytics"] }
    ]
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    console.log(slug);


    const packages = servicePackages[slug] ?? [];
    // pass slug and data to a client component that can use useTheme() or other hooks
    return <ServiceClient slug={slug} packages={packages} />;
}