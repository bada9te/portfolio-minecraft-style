// src/app/render-world/[project]/RenderWorldClient.tsx
"use client";

import React, {Fragment, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";

type Project = {
    title: string;
    github?: string;
    deployedHttpAddress?: string;
};

export default function RenderWorldClient({
  project,
  targetProject,
}: {
    project: string;
    targetProject?: Project;
}) {
    const [grayTarget, setGrayTarget] = useState(0);
    const [mobileGrayTarget, setMobileGrayTarget] = useState(0);
    const [showContinueButton, setShowContinueButton] = useState(false);

    // DESKTOP progress animation
    useEffect(() => {
        const iId = setInterval(() => {
            setGrayTarget((prev) => {
                if (prev + 1 >= 16) {
                    clearInterval(iId);
                    handleShowLinksWithButtons();
                    return prev;
                }
                return prev + 1;
            });
        }, 424);
        return () => clearInterval(iId);
    }, []);

    // MOBILE progress animation
    useEffect(() => {
        const iId = setInterval(() => {
            setMobileGrayTarget((prev) => {
                if (prev + 1 >= 23) {
                    clearInterval(iId);
                    return prev;
                }
                return prev + 1;
            });
        }, 100);
        return () => clearInterval(iId);
    }, []);

    const handleShowLinksWithButtons = () => {
        setShowContinueButton(true);
    };

    return (
        <>
            <CheckScreenOrientation/>
            <div className="bg-transparent lg:bg-[url(/bgs/dirt.png)] w-screen h-screen z-20 text-white flex flex-col justify-center items-center">
                <div className="flex flex-col gap-3 items-center justify-center">

                    {/* PC LAYOUT */}
                    {
                        showContinueButton &&
                        <div className={"w-full h-fit hidden lg:flex items-center justify-center mb-7"}>
                            <Image src={"/textures/dirt_block.webp"} alt={"dirt_block"} width={140} height={140}/>
                        </div>
                    }

                    <span className="text-xl hidden lg:block">{
                        showContinueButton ?
                            "Ready to explore the project":
                            `${Math.floor((grayTarget / 15) * 100)}%`
                    }</span>

                    {
                        !showContinueButton &&
                        <video width={200} height={200} autoPlay muted loop={false} onEnded={handleShowLinksWithButtons} className={"hidden lg:block"}>
                            <source src="/bgs/chunk_loading.mp4" type="video/mp4" />
                        </video>
                    }

                    {
                        // continue button (navigate to the project)
                        showContinueButton &&
                        <>
                            <div className={"hidden flex-col gap-4 items-center justify-center lg:flex"}>
                                <div className={"flex flex-row gap-3 items-center justify-center mt-4"}>
                                    <div className={`h-2 w-[18px] ${!targetProject?.github ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                    Publicly available at GitHub
                                </div>
                                <div className={"flex flex-row gap-3 items-center justify-center mt-4"}>
                                    <div className={`h-2 w-[18px] ${!targetProject?.deployedHttpAddress ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                    Accessible via https
                                </div>
                            </div>


                            <div className={"hidden lg:flex flex-row gap-4"}>
                                {
                                    targetProject?.github &&
                                    <Link
                                        href={targetProject?.github as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={"mt-10 hidden lg:block"}
                                    >
                                        <div className={"min-w-48 h-16 bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                            View at GitHub
                                        </div>
                                    </Link>

                                }

                                {
                                    targetProject?.deployedHttpAddress &&
                                    <Link
                                        href={targetProject?.deployedHttpAddress as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={"mt-10 hidden lg:block"}
                                    >
                                        <div className={"min-w-48 h-16 bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                            {targetProject?.deployedHttpAddress?.slice(0, 14)}...
                                        </div>
                                    </Link>
                                }


                                <Link
                                    href={"/projects"}
                                    className={"mt-10 hidden lg:block"}
                                >
                                    <div className={"min-w-48 h-16 bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                        {`<< Go back`}
                                    </div>
                                </Link>
                            </div>
                        </>

                    }

                    { /* MOBILE LAYOUT */ }
                    <div className={"block lg:hidden"}>
                        <Image
                            src={"/texts/main_menu_mobile.png"}
                            alt={"title"}
                            width={1000}
                            height={1000}
                            className={"hidden portrait:block -mt-10 lg:mt-0 w-80"}
                        />

                        <Image
                            src={"/texts/main_menu.png"}
                            alt={"title"}
                            width={1920}
                            height={1080}
                            className={"hidden landscape:block portrait:w-[340px] landscape:w-[600px] landscape:lg:w-[800px]"}
                        />
                    </div>


                    <div
                        className={`
                            flex flex-col items-center justify-start
                            lg:hidden portrait:max-w-80 landscape:max-w-xl 
                            bg-[#C5C5C5] min-h-48 portrait:min-w-full landscape:min-w-[500px] 
                            portrait:mt-10 landscape:-mt-10 
                            border-white border-b-[#535354] border-r-[#535354]
                            border-3 px-3 pb-3 relative
                        `}
                    >
                        <Link href={"/projects"} className={"absolute top-0 right-4 cursor-pointer shadow-2xl"}>
                            <Image
                                src={"/textures/arrow_back.png"}
                                alt={"arrow_back"}
                                className={"w-7 h-7"}
                                width={100}
                                height={100}
                            />
                        </Link>

                        <span className={"text-[#464646] mt-2 portrait:text-md landscape:text-lg"}>{mobileGrayTarget <= 21 ? "Generating world..." : "Generation completed"}</span>

                        <div className={"relative w-full portrait:min-w-full landscape:min-w-[546px] h-full bg-black border-white border-t-[#535354] border-l-[#535354] border-3 px-7 pt-2"}>
                            {
                                mobileGrayTarget <= 21 &&
                                <span className={"portrait:text-sm landscape:text-md"}>Generating the terrain and preparing github links...</span>
                            }

                            {
                                mobileGrayTarget <= 21 &&
                                <div className={"absolute bottom-6 -translate-x-1/2 left-1/2 flex flex-row gap-[3px] bg-black"}>
                                    {
                                        Array.from({ length: 23 }).map((_, i) => (
                                            <div key={i} className={`h-2 portrait:w-[8px] landscape:w-[18px] ${mobileGrayTarget < i ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                        ))
                                    }
                                </div>
                            }

                            {
                                mobileGrayTarget > 21 &&
                                <div className={"flex flex-col gap-0 items-center justify-center lg:hidden mb-4 w-full"}>
                                    <div className={"flex portrait:flex-col landscape:flex-row gap-3 items-center justify-between mt-4 w-full"}>
                                        <div className={`h-2 w-[18px] ${!targetProject?.github ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                        <span className={"portrait:text-sm landscape:text-md"}>Publicly available at GitHub</span>
                                        <Link
                                            href={targetProject?.github || targetProject?.deployedHttpAddress as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={"mt-0"}
                                        >
                                            <div className={"min-w-40 h-[33px] bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                                View at GitHub
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={"flex portrait:flex-col landscape:flex-row gap-3 items-center justify-between mt-4 w-full"}>
                                        <div className={`h-2 w-[18px] ${!targetProject?.deployedHttpAddress ? "bg-gradient-to-r from-[#3B572D] via-[#1A281D] to-[#3B572D]" : "bg-[#7EBD4D]"}`}></div>
                                        <span className={"portrait:text-sm landscape:text-md"}>Accessible online via https</span>
                                        <Link
                                            href={targetProject?.deployedHttpAddress || targetProject?.github as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={"mt-0"}
                                        >
                                            <div className={"min-w-40 h-[33px] bg-[#968682] border-3 border-[#BDB2AF] relative border-b-[#3A3638] border-r-[#3A3638] flex items-center justify-center"}>
                                                {targetProject?.deployedHttpAddress?.slice(0, 14)}...
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
