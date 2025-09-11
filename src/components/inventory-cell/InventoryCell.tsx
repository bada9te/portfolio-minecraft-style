import {ReactNode, useCallback, useRef} from "react";
import Tooltip from "@/components/tooltip/Tooltip";

export default function InventoryCell({ itemAsImage, handleClick, isSelected, tooltip, enlarged, }: { tooltip?: string, itemAsImage?: ReactNode, handleClick?: () => void, isSelected?: boolean, enlarged?: boolean }) {
    const playAudioAndClick = useCallback(() => {
        if (itemAsImage) {
            if (isSelected) {
                const audio = new Audio("/audio/enchant_displace.ogg");
                audio.play();
            } else {
                const audio = new Audio("/audio/enchant_place.ogg");
                audio.play();
            }
        }

        handleClick && handleClick();
    }, [handleClick, itemAsImage, isSelected])

    return (
        <Tooltip text={tooltip ? tooltip : ""}>
            <div onClick={playAudioAndClick} className={`
            group relative
            ${enlarged ? "w-[68px] h-[68px] p-3" : "w-[59.5px] h-[59.5px] p-0"}
            bg-[#8D8D8D] border-3 border-[#373737] border-b-white border-r-white 
            hover:bg-[#C0C0C0] ${isSelected ? 'bg-[#C0C0C0]' : ''}
            flex items-center justify-center cursor-pointer
        `}>
                {itemAsImage}
            </div>
        </Tooltip>

    );
}