import React from 'react'

export type ServiceCardProps = {
    projectId: string
    serviceName: string
    serviceDescription: string
    link: string
}

const services: Record<string, ServiceCardProps> = {
    "Consulting": {
        projectId: "iHdCwuSNOjmRHXeJZj8C",
        serviceName: "Consulting",
        serviceDescription:
            "We orchestrate full-spectrum social ecosystems: strategic planning, magnetic content creation, and active engagement — to transform passive audiences into loyal brand communities.",
        link: "/services/consulting",
    },
    "Digital Marketing": {
        projectId: "6sPH4eBGAemz0aqAcYa4",
        serviceName: "Digital Marketing",
        serviceDescription:
            "We forge cohesive brand systems: from iconic logos to comprehensive brand manuals and packaging that communicate values instantly and memorably across every touchpoint.",
        link: "/services/digital-marketing",
    },
    "Ads Management": {
        projectId: "IK8TF732RJLl2MOfsApO",
        serviceName: "Ads Management",
        serviceDescription:
            "Visuals that move and convert. We produce striking photography, cinematic videos, and immersive campaigns that capture attention, communicate essence, and spark engagement.",
        link: "/services/ads-management",
    },
    "IT Solutions": {
        projectId: "Qm7JcoLU7gGJQRAKzKer",
        serviceName: "IT Solutions",
        serviceDescription:
            "Authority through storytelling. We design strategic content plans with persuasive copy, educational materials, and automated campaigns that position your brand as a trusted industry leader.",
        link: "/services/it-solutions",
    },
}

export default function useServicesInformation() {
    const all = React.useMemo(() => services, [])

    const getService = React.useCallback((name: string): ServiceCardProps | null => {
        return services[name] ?? null
    }, [])

    return { services: all, getService }
}