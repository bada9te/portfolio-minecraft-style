"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {projects} from "@/static-data/projects";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";


export default function RenderWorldPage({ params }: { params: { project: string } }) {
    const { project } = React.use(params as any) as { project: string };
    const [grayTarget, setGrayTarget] = useState(0);
    const [mobileGrayTarget, setMobileGrayTarget] = useState(0);
    const router = useRouter();
    const [showContinueButton, setShowContinueButton] = useState(false);

    const targetProject = projects.find(
        i => i.title.replaceAll(' ', '') == project
    );

    // DESKTOP
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


    // MOBILE
    useEffect(() => {
        const iId = setInterval(() => {
            setMobileGrayTarget(prev => {
                if (prev + 1 >= 23) {
                    clearInterval(iId);
                    return prev;
                }
                return prev + 1;
            });
        }, 100); // speed per ring
        return () => clearInterval(iId);
    }, []);

    const handleVideoEnded = () => {
        setShowContinueButton(true);
    };

    return (
        <>
            <CheckScreenOrientation/>
            <div className="bg-transparent lg:bg-[url(/bgs/dirt.png)] w-screen h-screen z-20 text-white flex flex-col justify-center items-center">
                <div className="flex flex-col gap-3 items-center justify-center">
                    {/* PC LAYOUT */}
                    <span className="text-xl hidden lg:block">{
                        showContinueButton ?
                            "Ready to explore the project":
                            `${Math.floor((grayTarget / 15) * 100)}%`
                    }</span>

                    {
                        !showContinueButton &&
                        <video width={200} height={200} autoPlay muted loop={false} onEnded={handleVideoEnded} className={"hidden lg:block"}>
                            <source src="/bgs/chunk_loading.mp4" type="video/mp4" />
                        </video>
                    }

                    {
                        // continue button (navigate to the project)
                        showContinueButton &&
                        <>
                            <div className={"hidden flex-col gap-4 items-center justify-center lg:flex"}>
                                <div className={"flex flex-row gap-3 items-center justify-center mt-4"}>
                                    <div className={`h-2 w-[18px] ${false ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                    Publicly available at GitHub
                                </div>
                                <div className={"flex flex-row gap-3 items-center justify-center mt-4"}>
                                    <div className={`h-2 w-[18px] ${true ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                    Accessible via https
                                </div>
                            </div>


                            <div className={"hidden lg:flex flex-row gap-4"}>
                                <Link
                                    href={targetProject?.deployedHttpAddress || targetProject?.github as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={"mt-10 hidden lg:block"}
                                >
                                    <div className={"min-w-48 h-16 bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                        View at GitHub
                                    </div>
                                </Link>

                                <Link
                                    href={targetProject?.deployedHttpAddress || targetProject?.github as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={"mt-10 hidden lg:block"}
                                >
                                    <div className={"min-w-48 h-16 bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                        {targetProject?.deployedHttpAddress?.slice(0, 14)}...
                                    </div>
                                </Link>
                            </div>
                        </>

                    }

                    { /* MOBILE LAYOUT */ }
                    <Image
                        src={"/texts/main_menu.png"}
                        alt={"title"}
                        width={1920}
                        height={1080}
                        className={"w-[600px] lg:w-[800px] mt-10 block lg:hidden"}
                    />

                    <div
                        className={`
                            flex flex-col items-center justify-start
                            lg:hidden max-w-xl 
                            bg-[#C5C5C5] min-h-48 min-w-[500px] -mt-10 border-white border-b-[#535354] border-r-[#535354]
                            border-3 px-3 pb-3
                        `}
                    >
                        <span className={"text-[#464646] mt-2 text-lg"}>{mobileGrayTarget <= 21 ? "Generating world..." : "Generation completed"}</span>

                        <div className={"relative w-full min-w-lg h-full bg-black border-white border-t-[#535354] border-l-[#535354] border-3 px-7 pt-2"}>
                            {
                                mobileGrayTarget <= 21 &&
                                <span>Generating the terrain and preparing github links...</span>
                            }

                            {
                                mobileGrayTarget <= 21 &&
                                <div className={"absolute bottom-6 -translate-x-1/2 left-1/2 flex flex-row gap-[3px] bg-black"}>
                                    {
                                        Array.from({ length: 23 }).map((_, i) => (
                                            <div key={i} className={`h-2 w-[18px] ${mobileGrayTarget < i ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                        ))
                                    }
                                </div>
                            }



                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
