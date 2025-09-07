'use client';

import {useEffect, useRef, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import Image from "next/image";
import MainMenuButton from "@/components/main-menu-btn/MainMenuButton";
import {Github} from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";

// avoid default 404 page
export default function RedirectPage() {
    const helperTextRef = useRef<HTMLSpanElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const path = usePathname();
    const router = useRouter();

    const modalIsOpened = path !== "/";

    useEffect(() => {
        if (isMounted && helperTextRef.current) {
            const ctx = gsap.context(() => {
                gsap.to(helperTextRef.current, {
                    scale: 1.1,        // немного увеличиваем
                    duration: 0.28,    // длительность
                    repeat: -1,        // бесконечно
                    yoyo: true,        // возвращаемся назад
                    ease: "sine.inOut" // плавная синусоида
                });
            });

            return () => {
                ctx.revert();
            }
        }
    }, [isMounted, helperTextRef]);


    useEffect(() => {
        setIsMounted(true);
    }, []);


    return (
        <>
            <CheckScreenOrientation/>
            <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
                <div className={`${modalIsOpened ? "opacity-0" : "opacity-100"} w-screen h-fit z-10 flex justify-center`}>
                    <div className={"relative flex flex-col items-center justify-center w-fit"}>
                        <Image
                            src={"/texts/main_menu.png"}
                            alt={"title"}
                            width={1920}
                            height={1080}
                            className={"w-[600px] lg:w-[800px] -mt-10 lg:mt-0"}
                        />

                        <span
                            ref={helperTextRef}
                            className={`
                                -rotate-[24deg] font-extrabold text-yellow-300 text-2xl lg:text-4xl -mt-10 lg:mt-0
                                [text-shadow:_3px_3px_0px_black] 
                                absolute -right-6 md:-right-12
                            `}
                        >
                            JS! JS! JS!
                        </span>
                    </div>

                </div>


                <div className={`${modalIsOpened ? "opacity-0" : "opacity-100"} -mt-6 lg:mt-10 w-full h-fit z-10 flex flex-col justify-center items-center max-w-sm lg:max-w-xl`}>
                    <div className={"flex flex-col items-center gap-1 lg:gap-3 w-full"}>
                        <MainMenuButton handleClickAction={() => router.push("/about")}>About Me</MainMenuButton>
                        <MainMenuButton handleClickAction={() => router.push("/tech-stack")}>Tech Stack</MainMenuButton>
                        <MainMenuButton handleClickAction={() => router.push("/projects")}>Projects</MainMenuButton>
                    </div>

                    <div className={"flex-row justify-between gap-3 w-full mt-14 hidden lg:flex"}>
                        <MainMenuButton handleClickAction={() => router.push("/contacts")}>Contacts</MainMenuButton>
                        <Link href={"https://github.com/bada9te"} target={"_blank"} className={"w-full"}>
                            <MainMenuButton handleClickAction={() => {}}><Github size={28} className={"mr-2"}/>Github</MainMenuButton>
                        </Link>
                    </div>
                </div>

                <span className={`${modalIsOpened ? "opacity-0" : "opacity-100"} absolute bottom-3 left-3 text-md lg:text-2xl`}>Portfolio v0.1 (Modded)</span>
                <span className={`${modalIsOpened ? "opacity-0" : "opacity-100"} absolute bottom-3 right-3 text-md lg:text-2xl`}>Bohdan Teliepov</span>
            </div>

        </>
    );
}