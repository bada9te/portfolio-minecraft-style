import {ReactNode} from "react";

export default function InventoryCell({ itemAsImage }: { itemAsImage?: ReactNode }) {
    return (
        <div className={`
            w-[59.5px] h-[59.5px] 
            bg-[#8D8D8D] border-3 border-[#373737] border-b-white border-r-white 
            hover:bg-[#C0C0C0]
            flex items-center justify-center
        `}>
            {itemAsImage}
        </div>
    );
}