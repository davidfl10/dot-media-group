import ServiceClient from "@/components/ServiceClient";

type PackageItem = {
  name: string;
  price: string;
  features: string[];
};

type ServiceData = {
  color: string;
  packages: PackageItem[];
};

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

export default async function ServicePage({
  params
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // await the params promise to unwrap it on the server
  const { slug } = await params;
  const service = servicePackages[slug];
  const color = service?.color ?? "#0B5724";
  const packages = service?.packages ?? [];

  // pass plain data to a client component (ServiceClient must be a "use client" component)
  return <ServiceClient slug={slug} color={color} packages={packages} />;
}