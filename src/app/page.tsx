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
            <div className={`${modalIsOpened ? "opacity-0" : "opacity-100"} relative w-fit h-fit -mt-24 z-10`}>
                <Image
                    src={"/texts/title_pc.png"}
                    alt={"title"}
                    width={1920}
                    height={1080}
                    className={"w-[800px]"}
                />

                <span
                    ref={helperTextRef}
                    className={"-rotate-[24deg] font-extrabold text-yellow-300 text-4xl [text-shadow:_3px_3px_0px_black] absolute -right-18 top-60"}
                >
                    JS! JS! JS!
                </span>
            </div>


            <div className={`${modalIsOpened ? "opacity-0" : "opacity-100"} w-fit h-fit -mt-24 z-10`}>
                <div className={"flex flex-col items-center gap-3 w-full min-w-xl"}>
                    <MainMenuButton handleClickAction={() => router.push("/about")}>About Me</MainMenuButton>
                    <MainMenuButton handleClickAction={() => router.push("/tech-stack")}>Tech Stack</MainMenuButton>
                    <MainMenuButton handleClickAction={() => router.push("/projects")}>Projects</MainMenuButton>
                </div>

                <div className={"flex flex-row justify-between gap-3 w-full min-w-xl mt-14"}>
                    <MainMenuButton handleClickAction={() => router.push("/contacts")}>Contacts</MainMenuButton>
                    <Link href={"https://github.com/bada9te"} target={"_blank"} className={"w-full"}>
                        <MainMenuButton handleClickAction={() => {}}><Github size={28} className={"mr-2"}/>Github</MainMenuButton>
                    </Link>
                </div>
            </div>

            <span className={`${modalIsOpened ? "opacity-0" : "opacity-100"} absolute bottom-3 left-3 text-2xl`}>Portfolio v0.1 (Modded)</span>
            <span className={`${modalIsOpened ? "opacity-0" : "opacity-100"} absolute bottom-3 right-3 text-2xl`}>Bohdan Teliepov</span>
        </>
    );
}