export default function Tooltip({ text }: { text: string }) {
    return (
        <div className={`absolute z-10 -translate-x-1/2 left-full -top-16 bg-[#180615] border-2 border-black w-fit h-fit hidden group-hover:block`}>
            <div className={"w-full h-full border-4 border-[#21033D] p-2"}>
                {text}
            </div>
        </div>
    );
}