"use client"
import React, {useState, useRef, useCallback} from "react";
import { createPortal } from "react-dom";

export default function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const showTooltip = useCallback(() => {
        if (ref.current && text.length) {
            const rect = ref.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY - 40, // 40px above
                left: rect.left + rect.width / 2 + window.scrollX,
            });
        }
    }, [ref.current, text]);

    const hideTooltip = () => setCoords(null);

    return (
        <div
            ref={ref}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            className="inline-block"
        >
            {children}
            {coords &&
                createPortal(
                    <div
                        className="absolute z-50 -translate-x-1/2 bg-[#180615] border-2 border-black"
                        style={{ top: coords.top, left: coords.left }}
                    >
                        <div className="border-4 border-[#21033D] p-2 text-white font-minecraft">{text}</div>
                    </div>,
                    document.body
                )}
        </div>
    );
}
