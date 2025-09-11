"use client"
import { useEffect, useState } from "react";

export default function RenderWorldPage() {
    const [grayTarget, setGrayTarget] = useState(0);

    const size = 24;
    const center = Math.floor(size / 2);

    // Build spiral layer by layer, but group by rings
    const rings: { i: number; j: number }[][] = [];

    for (let layer = 0; layer <= center; layer++) {
        const min = center - layer;
        const max = center + layer;

        const ringCells: { i: number; j: number }[] = [];

        // Top edge (left → right)
        for (let j = min; j <= max; j++) ringCells.push({ i: min, j });

        // Right edge (top → bottom)
        for (let i = min + 1; i <= max; i++) ringCells.push({ i, j: max });

        // Bottom edge (right → left)
        for (let j = max - 1; j >= min; j--) ringCells.push({ i: max, j });

        // Left edge (bottom → top)
        for (let i = max - 1; i > min; i--) ringCells.push({ i, j: min });

        rings.push(ringCells);
    }

    useEffect(() => {
        const iId = setInterval(() => {
            setGrayTarget(prev => {
                if (prev + 1 >= 16) {
                    clearInterval(iId);
                    return prev;
                }
                return prev + 1;
            });
        }, 55); // speed per ring
        return () => clearInterval(iId);
    }, [rings.length]);

    return (
        <div className="bg-[url(/bgs/dirt.png)] w-screen h-screen bg-black z-50 text-white flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 items-center justify-center">
                <span className="text-xl">{Math.floor((grayTarget / 15 / 2) * 100)}%</span>
                <div
                    className="w-48 h-48 bg-black grid overflow-hidden"
                    style={{
                        gridTemplateColumns: `repeat(${size}, 1fr)`,
                        gridTemplateRows: `repeat(${size}, 1fr)`,
                    }}
                >
                    {rings.slice(0, grayTarget).flat().map(({ i, j }, idx) => (
                        <div
                            key={`${i}_${j}_${idx}`}
                            className="bg-[#9A9998] -mt-[10px] -ml-[6px]"
                            style={{ gridColumn: j + 1, gridRow: i + 1 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
