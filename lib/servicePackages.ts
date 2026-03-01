export type Feature = {
    name: string;
    description: string;
    enable?: boolean;
};

export type PackageItem = {
    name: string;
    description: string;
    price: string;
    features: Feature[];
};

export type ServiceCategory = {
    description: string;
    packages: PackageItem[];
};

export type ServiceData = {
    heroBg: string;
    mainBg: string;
    secondaryBg: string;
    secondaryBgLight: string;
    cardBg: string;
    name: string;
    description: string;
    services: Record<string, ServiceCategory>;
};

export const servicePackages: Record<string, Record<string, ServiceData>> = {
    en: {
        "consulting": {
            heroBg: "#1A1A1A",
            mainBg: "#462E30",
            secondaryBg: "#A4787C",
            secondaryBgLight: "#BA979A",
            cardBg: "rgba(55, 27, 27, 0.60)",
            name: "Consulting",
            description: "Our consulting services provide expert guidance to help you navigate complex business challenges and achieve your goals.",
            services: {
                "Business Strategy": {
                    description: "We help you define a clear path forward with actionable strategies tailored to your market, goals, and competitive landscape.",
                    packages: [
                        {
                            name: "START",
                            description: "Ideal for early-stage businesses seeking direction.",
                            price: "250$",
                            features: [
                                { name: "Business health audit", description: "A comprehensive review of your current operations, finances, and market position to establish a clear baseline.", enable: true },
                                { name: "Goal alignment session", description: "A structured workshop to align leadership around core objectives, KPIs, and a shared vision for growth.", enable: true },
                                { name: "Competitive landscape analysis", description: "An in-depth analysis of your competitors, market gaps, and positioning opportunities within your industry.", enable: false },
                                { name: "Strategic roadmap", description: "A 12-month actionable plan with prioritized milestones, resource requirements, and measurable outcomes.", enable: false },
                                { name: "Risk assessment framework", description: "Identification and mitigation planning for key business, financial, and operational risks relevant to your goals.", enable: false },
                                { name: "Revenue growth modeling", description: "Data-driven projections and scenario modeling to identify the most viable paths to sustainable revenue growth.", enable: false },
                                { name: "Organizational structure review", description: "An evaluation of your team structure, roles, and workflows with recommendations to improve efficiency and accountability.", enable: false },
                                { name: "Quarterly strategy reviews", description: "Scheduled check-ins to assess progress against your roadmap, adapt strategies, and reprioritize based on results.", enable: false },
                            ]
                        },
                        {
                            name: "GROWTH",
                            description: "For businesses ready to scale with a structured plan.",
                            price: "400$ - 500$",
                            features: [
                                { name: "Business health audit", description: "A comprehensive review of your current operations, finances, and market position to establish a clear baseline.", enable: true },
                                { name: "Goal alignment session", description: "A structured workshop to align leadership around core objectives, KPIs, and a shared vision for growth.", enable: true },
                                { name: "Competitive landscape analysis", description: "An in-depth analysis of your competitors, market gaps, and positioning opportunities within your industry.", enable: true },
                                { name: "Strategic roadmap", description: "A 12-month actionable plan with prioritized milestones, resource requirements, and measurable outcomes.", enable: true },
                                { name: "Risk assessment framework", description: "Identification and mitigation planning for key business, financial, and operational risks relevant to your goals.", enable: false },
                                { name: "Revenue growth modeling", description: "Data-driven projections and scenario modeling to identify the most viable paths to sustainable revenue growth.", enable: false },
                                { name: "Organizational structure review", description: "An evaluation of your team structure, roles, and workflows with recommendations to improve efficiency and accountability.", enable: false },
                                { name: "Quarterly strategy reviews", description: "Scheduled check-ins to assess progress against your roadmap, adapt strategies, and reprioritize based on results.", enable: false },
                            ]
                        },
                        {
                            name: "LAUNCH",
                            description: "Full strategic support for ambitious launches.",
                            price: "700$ - 900$",
                            features: [
                                { name: "Business health audit", description: "A comprehensive review of your current operations, finances, and market position to establish a clear baseline.", enable: true },
                                { name: "Goal alignment session", description: "A structured workshop to align leadership around core objectives, KPIs, and a shared vision for growth.", enable: true },
                                { name: "Competitive landscape analysis", description: "An in-depth analysis of your competitors, market gaps, and positioning opportunities within your industry.", enable: true },
                                { name: "Strategic roadmap", description: "A 12-month actionable plan with prioritized milestones, resource requirements, and measurable outcomes.", enable: true },
                                { name: "Risk assessment framework", description: "Identification and mitigation planning for key business, financial, and operational risks relevant to your goals.", enable: true },
                                { name: "Revenue growth modeling", description: "Data-driven projections and scenario modeling to identify the most viable paths to sustainable revenue growth.", enable: true },
                                { name: "Organizational structure review", description: "An evaluation of your team structure, roles, and workflows with recommendations to improve efficiency and accountability.", enable: false },
                                { name: "Quarterly strategy reviews", description: "Scheduled check-ins to assess progress against your roadmap, adapt strategies, and reprioritize based on results.", enable: false },
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "All-inclusive consulting for high-growth enterprises.",
                            price: "1000$ - 1300$",
                            features: [
                                { name: "Business health audit", description: "A comprehensive review of your current operations, finances, and market position to establish a clear baseline.", enable: true },
                                { name: "Goal alignment session", description: "A structured workshop to align leadership around core objectives, KPIs, and a shared vision for growth.", enable: true },
                                { name: "Competitive landscape analysis", description: "An in-depth analysis of your competitors, market gaps, and positioning opportunities within your industry.", enable: true },
                                { name: "Strategic roadmap", description: "A 12-month actionable plan with prioritized milestones, resource requirements, and measurable outcomes.", enable: true },
                                { name: "Risk assessment framework", description: "Identification and mitigation planning for key business, financial, and operational risks relevant to your goals.", enable: true },
                                { name: "Revenue growth modeling", description: "Data-driven projections and scenario modeling to identify the most viable paths to sustainable revenue growth.", enable: true },
                                { name: "Organizational structure review", description: "An evaluation of your team structure, roles, and workflows with recommendations to improve efficiency and accountability.", enable: true },
                                { name: "Quarterly strategy reviews", description: "Scheduled check-ins to assess progress against your roadmap, adapt strategies, and reprioritize based on results.", enable: true },
                            ]
                        }
                    ]
                },
                "Brand Consulting": {
                    description: "We work with you to define, position, and communicate your brand with clarity and confidence.",
                    packages: [
                        {
                            name: "START",
                            description: "Core brand positioning for new businesses.",
                            price: "200$",
                            features: [
                                { name: "Brand audit", description: "An evaluation of your current brand perception and positioning in the market." },
                                { name: "Positioning session", description: "A collaborative session to define your unique brand voice and value proposition." }
                            ]
                        },
                        {
                            name: "GROWTH",
                            description: "Brand development for evolving businesses.",
                            price: "350$ - 450$",
                            features: [
                                { name: "Brand identity refinement", description: "Refining your visual and verbal identity to better resonate with your target audience." },
                                { name: "Messaging framework", description: "A structured framework for consistent brand communication across all channels." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Complete brand transformation and strategy.",
                            price: "800$ - 1100$",
                            features: [
                                { name: "Full brand overhaul", description: "A complete transformation of your brand identity, messaging, and market positioning." },
                                { name: "Go-to-market strategy", description: "A tailored plan to successfully launch or reposition your brand in the market." }
                            ]
                        }
                    ]
                }
            }
        },

        "digital-marketing": {
            heroBg: "#161616",
            mainBg: "#272F39",
            secondaryBg: "#64748B",
            secondaryBgLight: "#7C8FAB",
            cardBg: "rgba(19, 36, 52, 0.60)",
            name: "Digital Marketing & Visual Communication",
            description: "Our digital marketing services are designed to elevate your brand's online presence and drive meaningful engagement through strategic campaigns and compelling visual communication.",
            services: {
                "Social Media Management": {
                    description: "Our Social Media Management service offers comprehensive solutions to elevate your brand's online presence, engage your audience, and drive meaningful results across all major platforms.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Basic social media management with setup and content creation.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Social media setup", description: "We will create and optimize your social media profiles on platforms such as Facebook, Instagram, Twitter, LinkedIn, and TikTok to ensure they are fully branded and ready for engagement." },
                                { name: "Basic content creation", description: "We will create and schedule basic content for your social media accounts." },
                                { name: "22 posts/month", description: "We will publish 22 posts per month across all your social media platforms." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Comprehensive social media management with strategy and advanced content creation.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Comprehensive strategy", description: "We will develop a comprehensive social media strategy tailored to your brand and audience." },
                                { name: "Advanced content creation", description: "We will create and schedule advanced content for your social media accounts." },
                                { name: "34 posts/month", description: "We will publish 34 posts per month across all your social media platforms." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Full platform management with premium content creation and analytics.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Full platform management", description: "We will manage all your social media platforms comprehensively." },
                                { name: "Premium content creation", description: "We will create premium quality content for your social media accounts." },
                                { name: "45 posts/month", description: "We will publish 45 posts per month across all your social media platforms." }
                            ]
                        }
                    ]
                },
                "Graphic Design & Branding": {
                    description: "Our Graphic Design & Branding service offers comprehensive solutions to establish and elevate your brand's visual identity.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Basic branding and identity design.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Logo & identity", description: "We will design a logo and brand identity for your business." },
                                { name: "Basic brand kit", description: "We will create a basic brand kit with guidelines and templates." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Extended branding guidelines and packaging mockups.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Extended guidelines", description: "We will create extended branding guidelines for your business." },
                                { name: "Packaging mockups", description: "We will create packaging mockups for your products." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Complete branding system with art direction.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Full branding system", description: "We will create a complete branding system for your business." },
                                { name: "Art direction", description: "We will provide art direction for all your branding materials." }
                            ]
                        }
                    ]
                },
                "Photo & Video Production": {
                    description: "Our Photo & Video Production service delivers high-quality visual content tailored to your brand's needs.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Basic photo and video production.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Half-day shoot", description: "A half-day photo or video shoot." },
                                { name: "Basic editing", description: "Basic editing of your photos or videos." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Extended photo and video production.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Full-day shoot", description: "A full-day photo or video shoot." },
                                { name: "Advanced editing", description: "Advanced editing of your photos or videos." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Premium photo and video production.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Cinematic production", description: "Cinematic production of your photos or videos." },
                                { name: "Post-production", description: "Professional post-production of your photos or videos." }
                            ]
                        }
                    ]
                },
                "Content Marketing & Editorial Strategy": {
                    description: "Our Content Marketing & Editorial Strategy service helps you create and manage compelling content that resonates with your audience.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Basic content marketing strategy.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Content calendar", description: "A content calendar tailored to your brand." },
                                { name: "Basic copywriting", description: "Basic copywriting for your content." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Extended content marketing strategy.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Multi-channel content", description: "Content tailored for multiple marketing channels." },
                                { name: "SEO-aware copy", description: "Copy optimized for search engines." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Premium content marketing strategy.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Full editorial program", description: "A full editorial program for your brand." },
                                { name: "Long-form production", description: "Long-form content production for in-depth engagement." }
                            ]
                        }
                    ]
                }
            }
        },

        "ads-management": {
            heroBg: "#1A1A1A",
            mainBg: "#403131",
            secondaryBg: "#9A7D7D",
            secondaryBgLight: "#AF9C9C",
            cardBg: "rgba(41, 30, 30, 0.60)",
            name: "Ads Management",
            description: "Our Ads Management service provides expert handling of your advertising campaigns to maximize ROI and drive targeted traffic to your business.",
            services: {
                "Social Media Ads": {
                    description: "We create, manage, and optimize paid social media campaigns across Facebook, Instagram, TikTok, and LinkedIn to maximize your reach and conversions.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Essential ad management for growing brands.",
                            price: "250$ + ad spend",
                            features: [
                                { name: "Ad setup", description: "We will set up your ad campaigns on the relevant social media platforms." },
                                { name: "Basic monitoring", description: "Regular monitoring of campaign performance with basic adjustments." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Comprehensive management with performance reporting.",
                            price: "400$ + ad spend",
                            features: [
                                { name: "Comprehensive management", description: "Full management of your ad campaigns including targeting, creatives, and budget allocation." },
                                { name: "Performance reports", description: "Detailed weekly performance reports with insights and recommendations." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Full-service ad management with advanced analytics.",
                            price: "600$ + ad spend",
                            features: [
                                { name: "Full-service management", description: "End-to-end management of all your social media ad campaigns." },
                                { name: "Advanced analytics", description: "In-depth analytics and conversion tracking to continuously optimize results." }
                            ]
                        }
                    ]
                },
                "Google & Search Ads": {
                    description: "We manage your Google Ads campaigns to capture high-intent traffic and convert searches into customers.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Basic Google Ads setup and monitoring.",
                            price: "300$ + ad spend",
                            features: [
                                { name: "Campaign setup", description: "Setup of Google Search or Display campaigns tailored to your goals." },
                                { name: "Keyword research", description: "Basic keyword research to target relevant search queries." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Full Google Ads management with optimization.",
                            price: "500$ + ad spend",
                            features: [
                                { name: "A/B testing", description: "Testing of different ad variations to identify top performers." },
                                { name: "Bid optimization", description: "Continuous bid adjustments to maximize return on ad spend." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Premium search advertising with full funnel coverage.",
                            price: "800$ + ad spend",
                            features: [
                                { name: "Full funnel strategy", description: "Campaigns covering awareness, consideration, and conversion stages." },
                                { name: "Dedicated account manager", description: "A dedicated specialist managing your Google Ads account full-time." }
                            ]
                        }
                    ]
                }
            }
        },

        "it-solutions": {
            heroBg: "#171C18",
            mainBg: "#253829",
            secondaryBg: "#8BA490",
            secondaryBgLight: "#A4BAA8",
            cardBg: "rgba(30, 41, 32, 0.60)",
            name: "IT Solutions",
            description: "Our IT Solutions service offers comprehensive technology solutions to optimize your business operations and enhance your digital infrastructure.",
            services: {
                "Web Development": {
                    description: "We design and develop high-performance websites and web applications tailored to your business needs.",
                    packages: [
                        {
                            name: "BASIC",
                            description: "Simple websites for small businesses and startups.",
                            price: "500$",
                            features: [
                                { name: "Landing page", description: "A professionally designed single-page website to represent your brand online." },
                                { name: "Mobile responsive", description: "Fully responsive design that works seamlessly across all devices." }
                            ]
                        },
                        {
                            name: "STANDARD",
                            description: "Multi-page websites with custom functionality.",
                            price: "800$",
                            features: [
                                { name: "Multi-page website", description: "A complete website with multiple pages, navigation, and custom design." },
                                { name: "CMS integration", description: "Integration with a content management system so you can easily update your content." }
                            ]
                        },
                        {
                            name: "ENTERPRISE",
                            description: "Complex web applications and enterprise platforms.",
                            price: "1200$",
                            features: [
                                { name: "Custom web application", description: "A fully custom web application built to your specific business requirements." },
                                { name: "Dedicated support team", description: "A dedicated development team providing ongoing maintenance and support." }
                            ]
                        }
                    ]
                },
                "IT Management": {
                    description: "We manage your IT infrastructure so you can focus on growing your business without technical disruptions.",
                    packages: [
                        {
                            name: "BASIC",
                            description: "Essential IT management for small teams.",
                            price: "500$",
                            features: [
                                { name: "System assessment", description: "A full review of your current IT infrastructure to identify vulnerabilities and inefficiencies." },
                                { name: "Basic setup", description: "Setup and configuration of essential IT systems and tools." }
                            ]
                        },
                        {
                            name: "STANDARD",
                            description: "Customized IT solutions with ongoing support.",
                            price: "800$",
                            features: [
                                { name: "Customized solutions", description: "Tailored IT solutions designed around your specific business workflows and needs." },
                                { name: "Ongoing support", description: "Regular maintenance and support to keep your systems running smoothly." }
                            ]
                        },
                        {
                            name: "ENTERPRISE",
                            description: "Comprehensive IT management for growing organizations.",
                            price: "1200$",
                            features: [
                                { name: "Comprehensive IT management", description: "Full management of all your IT systems, networks, and infrastructure." },
                                { name: "Dedicated support team", description: "A dedicated IT team available to resolve issues and implement improvements." }
                            ]
                        }
                    ]
                }
            }
        }
    },

    ro: {
        "consulting": {
            heroBg: "#1A1A1A",
            mainBg: "#462E30",
            secondaryBg: "#A4787C",
            secondaryBgLight: "#BA979A",
            cardBg: "rgba(55, 27, 27, 0.60)",
            name: "Consultanță",
            description: "Serviciile noastre de consultanță oferă îndrumare expertă pentru a vă ajuta să navigați provocările complexe de afaceri și să vă atingeți obiectivele.",
            services: {
                "Strategie de Afaceri": {
                    description: "Vă ajutăm să definiți un drum clar înainte cu strategii acționabile adaptate pieței, obiectivelor și peisajului competitiv.",
                    packages: [
                        {
                            name: "START",
                            description: "Ideal pentru afaceri în fază incipientă care caută direcție.",
                            price: "250$",
                            features: [
                                { name: "Evaluare inițială", description: "O analiză aprofundată a situației dvs. de afaceri actuale, identificând punctele forte, slabe și oportunitățile." },
                                { name: "Sesiune de strategie", description: "O sesiune focalizată pentru a alinia viziunea dvs. și a defini prioritățile pe termen scurt." }
                            ]
                        },
                        {
                            name: "GROWTH",
                            description: "Pentru afaceri pregătite să scaleze cu un plan structurat.",
                            price: "400$ - 500$",
                            features: [
                                { name: "Plan complet", description: "O foaie de parcurs strategică detaliată care acoperă operațiunile, marketingul și etapele de creștere." },
                                { name: "Suport implementare", description: "Îndrumare continuă pentru a vă ajuta să vă executați strategia eficient." }
                            ]
                        },
                        {
                            name: "LAUNCH",
                            description: "Suport strategic complet pentru lansări ambițioase.",
                            price: "700$ - 900$",
                            features: [
                                { name: "Consultanță full-service", description: "Consultanță strategică completă în toate domeniile cheie de afaceri." },
                                { name: "Echipă dedicată", description: "O echipă dedicată de consultanți care lucrează îndeaproape cu organizația dvs." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Consultanță all-inclusive pentru întreprinderi cu creștere rapidă.",
                            price: "1000$ - 1300$",
                            features: [
                                { name: "Strategie all-inclusive", description: "Consultanță cuprinzătoare acoperind fiecare aspect al strategiei și operațiunilor dvs. de afaceri." },
                                { name: "Suport 24/7", description: "Acces non-stop la echipa dvs. de consultanță pentru decizii urgente și îndrumare." }
                            ]
                        }
                    ]
                },
                "Consultanță de Brand": {
                    description: "Lucrăm cu dvs. pentru a defini, poziționa și comunica brandul dvs. cu claritate și încredere.",
                    packages: [
                        {
                            name: "START",
                            description: "Poziționare de bază a brandului pentru afaceri noi.",
                            price: "200$",
                            features: [
                                { name: "Audit de brand", description: "O evaluare a percepției și poziționării actuale a brandului dvs. pe piață." },
                                { name: "Sesiune de poziționare", description: "O sesiune colaborativă pentru a defini vocea unică și propunerea de valoare a brandului dvs." }
                            ]
                        },
                        {
                            name: "GROWTH",
                            description: "Dezvoltarea brandului pentru afaceri în evoluție.",
                            price: "350$ - 450$",
                            features: [
                                { name: "Rafinarea identității de brand", description: "Rafinarea identității vizuale și verbale pentru a rezona mai bine cu publicul țintă." },
                                { name: "Cadru de mesagerie", description: "Un cadru structurat pentru comunicarea consistentă a brandului pe toate canalele." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Transformare și strategie completă de brand.",
                            price: "800$ - 1100$",
                            features: [
                                { name: "Rebranding complet", description: "O transformare completă a identității, mesajelor și poziționării pe piață a brandului dvs." },
                                { name: "Strategie go-to-market", description: "Un plan personalizat pentru a lansa sau repoziționa cu succes brandul dvs. pe piață." }
                            ]
                        }
                    ]
                }
            }
        },

        "digital-marketing": {
            heroBg: "#161616",
            mainBg: "#272F39",
            secondaryBg: "#64748B",
            secondaryBgLight: "#7C8FAB",
            cardBg: "rgba(19, 36, 52, 0.60)",
            name: "Marketing Digital & Comunicare Vizuală",
            description: "Serviciile noastre de marketing digital sunt concepute pentru a ridica prezența online a brandului dvs. și a genera angajament semnificativ prin campanii strategice și comunicare vizuală convingătoare.",
            services: {
                "Gestionare Social Media": {
                    description: "Serviciul nostru de Gestionare Social Media oferă soluții complete pentru a îmbunătăți prezența online a brandului dvs., a implica publicul și a genera rezultate semnificative.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Gestionare de bază a rețelelor sociale cu configurare și creare de conținut.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Configurare rețele sociale", description: "Vom crea și optimiza profilurile dvs. de social media pe platforme precum Facebook, Instagram, Twitter, LinkedIn și TikTok." },
                                { name: "Creare conținut de bază", description: "Vom crea și programa conținut de bază pentru conturile dvs. de social media." },
                                { name: "22 postări/lună", description: "Vom publica 22 de postări pe lună pe toate platformele dvs. de social media." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Gestionare cuprinzătoare a rețelelor sociale cu strategie și creare avansată de conținut.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Strategie cuprinzătoare", description: "Vom dezvolta o strategie cuprinzătoare de social media adaptată brandului și publicului dvs." },
                                { name: "Creare conținut avansat", description: "Vom crea și programa conținut avansat pentru conturile dvs. de social media." },
                                { name: "34 postări/lună", description: "Vom publica 34 de postări pe lună pe toate platformele dvs. de social media." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Gestionare completă a platformelor cu creare de conținut premium și analiză.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Gestionare completă platforme", description: "Vom gestiona cuprinzător toate platformele dvs. de social media." },
                                { name: "Creare conținut premium", description: "Vom crea conținut de calitate premium pentru conturile dvs. de social media." },
                                { name: "45 postări/lună", description: "Vom publica 45 de postări pe lună pe toate platformele dvs. de social media." }
                            ]
                        }
                    ]
                },
                "Design Grafic & Branding": {
                    description: "Serviciul nostru de Design Grafic & Branding oferă soluții complete pentru a stabili și îmbunătăți identitatea vizuală a brandului dvs.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Design de bază pentru branding și identitate.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Logo & identitate", description: "Vom proiecta un logo și o identitate de brand pentru afacerea dvs." },
                                { name: "Kit de brand de bază", description: "Vom crea un kit de brand de bază cu ghiduri și șabloane." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Ghiduri extinse de branding și machete de ambalaj.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Ghiduri extinse", description: "Vom crea ghiduri extinse de branding pentru afacerea dvs." },
                                { name: "Machete ambalaj", description: "Vom crea machete de ambalaj pentru produsele dvs." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Sistem complet de branding cu direcție artistică.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Sistem complet de branding", description: "Vom crea un sistem complet de branding pentru afacerea dvs." },
                                { name: "Direcție artistică", description: "Vom oferi direcție artistică pentru toate materialele dvs. de branding." }
                            ]
                        }
                    ]
                },
                "Producție Foto & Video": {
                    description: "Serviciul nostru de Producție Foto & Video livrează conținut vizual de înaltă calitate adaptat nevoilor brandului dvs.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Producție de bază foto și video.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Filmare jumătate de zi", description: "O ședință foto sau video de jumătate de zi." },
                                { name: "Editare de bază", description: "Editare de bază a fotografiilor sau videoclipurilor dvs." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Producție extinsă foto și video.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Filmare o zi întreagă", description: "O ședință foto sau video de o zi întreagă." },
                                { name: "Editare avansată", description: "Editare avansată a fotografiilor sau videoclipurilor dvs." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Producție foto și video premium.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Producție cinematică", description: "Producție cinematică a fotografiilor sau videoclipurilor dvs." },
                                { name: "Post-producție", description: "Post-producție profesională a fotografiilor sau videoclipurilor dvs." }
                            ]
                        }
                    ]
                },
                "Marketing de Conținut & Strategie Editorială": {
                    description: "Serviciul nostru de Marketing de Conținut & Strategie Editorială vă ajută să creați și să gestionați conținut convingător care rezonează cu publicul dvs.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Strategie de bază de marketing de conținut.",
                            price: "600$ + 250$",
                            features: [
                                { name: "Calendar editorial", description: "Un calendar de conținut adaptat brandului dvs." },
                                { name: "Copywriting de bază", description: "Copywriting de bază pentru conținutul dvs." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Strategie extinsă de marketing de conținut.",
                            price: "900$ + 300$",
                            features: [
                                { name: "Conținut multicanal", description: "Conținut adaptat pentru multiple canale de marketing." },
                                { name: "Copy optimizat SEO", description: "Copy optimizat pentru motoarele de căutare." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Strategie premium de marketing de conținut.",
                            price: "1500$ + 350$",
                            features: [
                                { name: "Program editorial complet", description: "Un program editorial complet pentru brandul dvs." },
                                { name: "Producție long-form", description: "Producție de conținut lung pentru implicare aprofundată." }
                            ]
                        }
                    ]
                }
            }
        },

        "ads-management": {
            heroBg: "#1A1A1A",
            mainBg: "#403131",
            secondaryBg: "#9A7D7D",
            secondaryBgLight: "#AF9C9C",
            cardBg: "rgba(41, 30, 30, 0.60)",
            name: "Gestionare Reclame",
            description: "Serviciul nostru de Gestionare Reclame oferă administrarea expertă a campaniilor dvs. publicitare pentru a maximiza ROI-ul și a genera trafic țintit.",
            services: {
                "Reclame Social Media": {
                    description: "Creăm, gestionăm și optimizăm campanii publicitare plătite pe Facebook, Instagram, TikTok și LinkedIn pentru a maximiza acoperirea și conversiile dvs.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Gestionare esențială a reclamelor pentru branduri în creștere.",
                            price: "250$ + buget publicitar",
                            features: [
                                { name: "Configurare reclame", description: "Vom configura campaniile dvs. publicitare pe platformele relevante de social media." },
                                { name: "Monitorizare de bază", description: "Monitorizare regulată a performanței campaniei cu ajustări de bază." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Gestionare cuprinzătoare cu rapoarte de performanță.",
                            price: "400$ + buget publicitar",
                            features: [
                                { name: "Gestionare cuprinzătoare", description: "Gestionare completă a campaniilor dvs. publicitare inclusiv targetare, creatives și alocare buget." },
                                { name: "Rapoarte de performanță", description: "Rapoarte săptămânale detaliate de performanță cu insight-uri și recomandări." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Gestionare full-service cu analiză avansată.",
                            price: "600$ + buget publicitar",
                            features: [
                                { name: "Gestionare full-service", description: "Gestionare completă a tuturor campaniilor dvs. publicitare pe social media." },
                                { name: "Analiză avansată", description: "Analiză aprofundată și urmărirea conversiilor pentru optimizarea continuă a rezultatelor." }
                            ]
                        }
                    ]
                },
                "Google & Reclame Search": {
                    description: "Gestionăm campaniile dvs. Google Ads pentru a capta trafic cu intenție ridicată și a converti căutările în clienți.",
                    packages: [
                        {
                            name: "STANDARD",
                            description: "Configurare și monitorizare de bază Google Ads.",
                            price: "300$ + buget publicitar",
                            features: [
                                { name: "Configurare campanie", description: "Configurarea campaniilor Google Search sau Display adaptate obiectivelor dvs." },
                                { name: "Cercetare cuvinte cheie", description: "Cercetare de bază a cuvintelor cheie pentru a targeta interogări de căutare relevante." }
                            ]
                        },
                        {
                            name: "ADVANCED",
                            description: "Gestionare completă Google Ads cu optimizare.",
                            price: "500$ + buget publicitar",
                            features: [
                                { name: "Testare A/B", description: "Testarea diferitelor variante de reclame pentru a identifica cele mai performante." },
                                { name: "Optimizare oferte", description: "Ajustări continue ale ofertelor pentru a maximiza rentabilitatea cheltuielilor publicitare." }
                            ]
                        },
                        {
                            name: "PREMIUM",
                            description: "Publicitate search premium cu acoperire completă a pâlniei.",
                            price: "800$ + buget publicitar",
                            features: [
                                { name: "Strategie full funnel", description: "Campanii acoperind etapele de conștientizare, considerare și conversie." },
                                { name: "Manager de cont dedicat", description: "Un specialist dedicat care gestionează contul dvs. Google Ads cu normă întreagă." }
                            ]
                        }
                    ]
                }
            }
        },

        "it-solutions": {
            heroBg: "#171C18",
            mainBg: "#253829",
            secondaryBg: "#8BA490",
            secondaryBgLight: "#A4BAA8",
            cardBg: "rgba(30, 41, 32, 0.60)",
            name: "Soluții IT",
            description: "Serviciul nostru de Soluții IT oferă soluții tehnologice complete pentru a optimiza operațiunile dvs. de afaceri și a îmbunătăți infrastructura digitală.",
            services: {
                "Dezvoltare Web": {
                    description: "Proiectăm și dezvoltăm site-uri web și aplicații web de înaltă performanță adaptate nevoilor dvs. de afaceri.",
                    packages: [
                        {
                            name: "BASIC",
                            description: "Site-uri simple pentru afaceri mici și startup-uri.",
                            price: "500$",
                            features: [
                                { name: "Landing page", description: "Un site web cu o singură pagină proiectat profesional pentru a reprezenta brandul dvs. online." },
                                { name: "Responsive mobil", description: "Design complet responsive care funcționează perfect pe toate dispozitivele." }
                            ]
                        },
                        {
                            name: "STANDARD",
                            description: "Site-uri cu mai multe pagini și funcționalitate personalizată.",
                            price: "800$",
                            features: [
                                { name: "Site cu mai multe pagini", description: "Un site web complet cu mai multe pagini, navigare și design personalizat." },
                                { name: "Integrare CMS", description: "Integrare cu un sistem de gestionare a conținutului pentru actualizarea ușoară a conținutului dvs." }
                            ]
                        },
                        {
                            name: "ENTERPRISE",
                            description: "Aplicații web complexe și platforme enterprise.",
                            price: "1200$",
                            features: [
                                { name: "Aplicație web personalizată", description: "O aplicație web complet personalizată construită conform cerințelor dvs. specifice de afaceri." },
                                { name: "Echipă de suport dedicată", description: "O echipă de dezvoltare dedicată care oferă întreținere și suport continuu." }
                            ]
                        }
                    ]
                },
                "Management IT": {
                    description: "Gestionăm infrastructura dvs. IT pentru ca dvs. să vă puteți concentra pe dezvoltarea afacerii fără întreruperi tehnice.",
                    packages: [
                        {
                            name: "BASIC",
                            description: "Management IT esențial pentru echipe mici.",
                            price: "500$",
                            features: [
                                { name: "Evaluare sistem", description: "O revizuire completă a infrastructurii dvs. IT actuale pentru a identifica vulnerabilități și ineficiențe." },
                                { name: "Configurare de bază", description: "Configurarea sistemelor și instrumentelor IT esențiale." }
                            ]
                        },
                        {
                            name: "STANDARD",
                            description: "Soluții IT personalizate cu suport continuu.",
                            price: "800$",
                            features: [
                                { name: "Soluții personalizate", description: "Soluții IT adaptate concepute în jurul fluxurilor de lucru și nevoilor dvs. specifice de afaceri." },
                                { name: "Suport continuu", description: "Întreținere și suport regulat pentru a menține sistemele dvs. funcționând fără probleme." }
                            ]
                        },
                        {
                            name: "ENTERPRISE",
                            description: "Management IT cuprinzător pentru organizații în creștere.",
                            price: "1200$",
                            features: [
                                { name: "Management IT cuprinzător", description: "Gestionarea completă a tuturor sistemelor, rețelelor și infrastructurii dvs. IT." },
                                { name: "Echipă de suport dedicată", description: "O echipă IT dedicată disponibilă pentru a rezolva probleme și a implementa îmbunătățiri." }
                            ]
                        }
                    ]
                }
            }
        }
    }
};