export default function InputBar({ onInput }: { onInput: (a: string) => void }) {
    return (
        <input
            onChange={(e) => onInput(e.target.value)}
            type="text"
            className="w-full max-w-xl h-[64px] bg-black text-white border-3 border-white px-4 outline-0"
        />
    );
}
