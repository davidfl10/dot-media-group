import React from 'react'

export type ServiceCardProps = {
    projectId: string
    borderColor: string
    serviceName: string
    serviceDescription: string
    link: string
}

const services: Record<string, ServiceCardProps> = {
    "Consulting": {
        projectId: "iHdCwuSNOjmRHXeJZj8C",
        borderColor: "pb-[1.5px] pl-[1.5px] bg-linear-to-r from-red-300 from-10% via-red-500 via-30% to-red-100 to-80%",
        serviceName: "Consulting",
        serviceDescription:
            "We orchestrate full-spectrum social ecosystems: strategic planning, magnetic content creation, and active engagement — to transform passive audiences into loyal brand communities.",
        link: "/services?domain=0",
    },
    "Digital Marketing": {
        projectId: "6sPH4eBGAemz0aqAcYa4",
        borderColor: "pb-[1.5px] pr-[1.5px] bg-linear-to-b from-blue-300 from-10% via-blue-500 via-30% to-blue-100 to-80%",
        serviceName: "Digital Marketing",
        serviceDescription:
            "We forge cohesive brand systems: from iconic logos to comprehensive brand manuals and packaging that communicate values instantly and memorably across every touchpoint.",
        link: "/services?domain=1",
    },
    "Ads Management": {
        projectId: "IK8TF732RJLl2MOfsApO",
        borderColor: "pt-[1.5px] pl-[1.5px] bg-linear-to-t from-amber-700 from-10% via-amber-800 via-30% to-amber-600 to-80%",
        serviceName: "Ads Management",
        serviceDescription:
            "Visuals that move and convert. We produce striking photography, cinematic videos, and immersive campaigns that capture attention, communicate essence, and spark engagement.",
        link: "/services?domain=2",
    },
    "IT Solutions": {
        projectId: "Qm7JcoLU7gGJQRAKzKer",
        borderColor: "pt-[1.5px] pr-[1.5px] bg-linear-to-l from-green-300 from-10% via-green-500 via-30% to-green-100 to-80%",
        serviceName: "IT Solutions",
        serviceDescription:
            "Authority through storytelling. We design strategic content plans with persuasive copy, educational materials, and automated campaigns that position your brand as a trusted industry leader.",
        link: "/services?domain=3",
    },
}

export default function useServicesInformation() {
    const all = React.useMemo(() => services, [])

    const getService = React.useCallback((name: string): ServiceCardProps | null => {
        return services[name] ?? null
    }, [])

    return { services: all, getService }
}