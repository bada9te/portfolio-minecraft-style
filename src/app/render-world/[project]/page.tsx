"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {projects} from "@/static-data/projects";


export default function RenderWorldPage({ params }: { params: { project: string } }) {
    const { project } = React.use(params as any) as { project: string };
    const [grayTarget, setGrayTarget] = useState(0);
    const router = useRouter();
    const [showContinueButton, setShowContinueButton] = useState(false);

    const targetProject = projects.find(
        i => i.title.replaceAll(' ', '') == project
    );


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
        setShowContinueButton(true);
    };

    return (
        <div className="bg-[url(/bgs/dirt.png)] w-screen h-screen bg-black z-50 text-white flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 items-center justify-center">
                <span className="text-xl">{
                    showContinueButton ?
                        "Ready to explore the project":
                        `${Math.floor((grayTarget / 15) * 100)}%`
                }</span>

                {
                    !showContinueButton &&
                    <video width={200} height={200} autoPlay muted loop={false} onEnded={handleVideoEnded}>
                        <source src="/bgs/chunk_loading.mp4" type="video/mp4" />
                    </video>
                }

                {
                    showContinueButton &&
                    <Link
                        href={targetProject?.deployedHttpAddress || targetProject?.github as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"mt-10"}
                    >
                        <div className={"min-w-48 h-16 bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                            {targetProject?.title}
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
}
