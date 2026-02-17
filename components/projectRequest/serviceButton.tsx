import arrow from "@/public/icons/arrow-right.svg";
import Image from "next/image";

const serviceButton = ({cheie, text, price, onClick, selected, pckge }: { cheie?: string, text: string, price?: string, onClick?: () => void, selected?: boolean, pckge?: boolean }) => {
    return (
        <button 
            key={cheie}
            className={`${pckge ? 'w-full lg:w-[48%]' : 'w-full'}  flex p-4 items-center justify-between gap-10 self-stretch rounded-[20px] border border-[#e2e8f02e] backdrop-blur-[6px] transition
                ${selected ? 'bg-[#ffffff14]' : 'bg-[#ffffff0a]'}
                hover:bg-[#ffffff14] active:bg-[#ffffff1a]`}
            onClick={onClick}
        >
            <div>
                <p className="font-jakarta text-xs font-normal text-start text-white uppercase">{text}</p>
                {price && <p className="font-jakarta text-xs text-start text-[#D7B783]">{price}</p>}
            </div>
            <Image src={arrow} alt="Arrow" width={20} height={20} />
        </button>
    )
}

export default serviceButton