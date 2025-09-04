"use client"
import {ReactNode, useCallback, useRef} from "react";

export default function MainMenuButton({ children, handleClickAction }: { children: ReactNode, handleClickAction: () => void }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleClickBtn = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [audioRef]);

    return (
        <button onClick={handleClickBtn} className={`font-minecraft text-2xl w-full h-[64px] bg-[#706E6D] border-3 border-black hover:border-white`}>
            <div className={`
              w-full h-full flex items-center justify-center 
              border-3 border-white/50 border-b-gray-700 border-r-gray-700 
              [text-shadow:_3px_3px_0px_black]
          `}>
                {children}
            </div>
            <audio src={"/audio/menu_click.mp3"} ref={audioRef} className={"hidden"} onEnded={handleClickAction}></audio>
        </button>

    );
}