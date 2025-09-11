"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


export default function RenderWorldPage() {
    const [grayTarget, setGrayTarget] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const iId = setInterval(() => {
            setGrayTarget(prev => {
                if (prev + 1 >= 16) {
                    clearInterval(iId);
                    return prev;
                }
                return prev + 1;
            });
        }, 424); // speed per ring
        return () => clearInterval(iId);
    }, []);

    const handleVideoEnded = () => {
        router.replace("/world");
    };

    return (
        <div className="bg-[url(/bgs/dirt.png)] w-screen h-screen bg-black z-50 text-white flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 items-center justify-center">
                <span className="text-xl">{Math.floor((grayTarget / 15) * 100)}%</span>

                <video width={200} height={200} autoPlay muted loop={false} onEnded={handleVideoEnded}>
                    <source src="/bgs/chunk_loading.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
