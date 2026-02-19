import Image, { StaticImageData } from "next/image";
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
    src: StaticImageData | string;
    alt: string;
    width?: number;
    height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
    return (
        <div
            {...props}
            className={cn(
                "relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
                className
            )}
        >
            <InfiniteSlider gap={42} reverse>
                {logos.map((logo) => (
                    <div key={`logo-${logo.alt}`} className="relative h-12 w-24 lg:h-20 lg:w-40 flex items-center">
                        <Image
                            alt={logo.alt}
                            className="pointer-events-none select-none dark:brightness-0 dark:invert"
                            width={logo.width}
                            height={logo.height}
                            src={logo.src}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
}
