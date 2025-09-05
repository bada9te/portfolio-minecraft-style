import {ReactNode, useCallback, useRef} from "react";
import Tooltip from "@/components/tooltip/Tooltip";

export default function InventoryCell({ itemAsImage, handleClick, isSelected, tooltip }: { tooltip?: string, itemAsImage?: ReactNode, handleClick?: () => void, isSelected?: boolean }) {
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
        <div onClick={playAudioAndClick} className={`
            group relative
            w-[59.5px] h-[59.5px] 
            bg-[#8D8D8D] border-3 border-[#373737] border-b-white border-r-white 
            hover:bg-[#C0C0C0] ${isSelected ? 'bg-[#C0C0C0]' : ''}
            flex items-center justify-center cursor-pointer
        `}>
            {itemAsImage}
            {
                tooltip && <Tooltip text={tooltip} />
            }
        </div>
    );
}