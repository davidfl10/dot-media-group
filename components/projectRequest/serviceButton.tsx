import arrow from "@/public/icons/chevron.png";
import Image from "next/image";

const serviceButton = ({cheie, text, price, onClick }: { cheie?: string, text: string, price?: string, onClick?: () => void }) => {
    return (
        <button 
            key={cheie}
            className="w-full flex p-4 items-center justify-between gap-10 self-stretch rounded-[20px] border border-[#e2e8f02e] bg-[#ffffff0a] backdrop-blur-[6px] transition hover:bg-[#ffffff14] active:bg-[#ffffff1a]"
            onClick={onClick}
        >
            <div>
                <p className="font-jakarta text-sm text-white">{text}</p>
                {price && <p className="font-jakarta text-xs text-[#D7B783]">{price}</p>}
            </div>
            <Image src={arrow} alt="Arrow" width={10} height={10} />
        </button>
    )
}

export default serviceButton