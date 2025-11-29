import ServiceClient from "@/components/ServiceClient";

type PackageItem = {
  name: string;
  price: string;
  features: string[];
};

type ServiceData = {
  colorLight: string;  // for white theme
  colorDark: string;   // for dark theme
  packages: PackageItem[];
};

const servicePackages: Record<string, ServiceData> = {
  consulting: {
    colorDark: "#662221",
    colorLight: "#C44D4D",
    packages: [
      { name: "START", price: "250$", features: ["Initial assessment", "Strategy session"] },
      { name: "GROWTH", price: "400-500$", features: ["Comprehensive plan", "Implementation support"] },
      { name: "LAUNCH", price: "700-900$", features: ["Full service", "Dedicated team"] },
      { name: "PREMIUM", price: "1000-1300$", features: ["All-inclusive", "24/7 support"] }
    ]
  },
  "digital-marketing": {
    colorDark: "#041A2F",
    colorLight: "#93C6F6",
    packages: [
      { name: "STANDARD", price: "600$ + 250$", features: ["Social media setup", "Basic content creation", "22 posts/month"] },
      { name: "ADVANCED", price: "900$ + 300$", features: ["Comprehensive strategy", "Advanced content creation", "34 posts/month"] },
      { name: "PREMIUM", price: "1500$ + 350$", features: ["Full platform management", "Premium content creation", "45 posts/month"] }
    ]
  },
  "it-solutions": {
    colorDark: "#2A382B",
    colorLight: "#89CF80",
    packages: [
      { name: "BASIC", price: "500$", features: ["System assessment", "Basic setup"] },
      { name: "STANDARD", price: "800$", features: ["Customized solutions", "Ongoing support"] },
      { name: "ENTERPRISE", price: "1200$", features: ["Comprehensive IT management", "Dedicated support team"] }
    ]
  },
  "ads-management": {
    colorDark: "#31271E",
    colorLight: "#704343",
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
  const { slug } = await params;
  const service = servicePackages[slug];
  const colorLight = service?.colorLight ?? "#662221";
  const colorDark = service?.colorDark ?? "#0B5724";
  const packages = service?.packages ?? [];

  return <ServiceClient slug={slug} colorLight={colorLight} colorDark={colorDark} packages={packages} />;
}