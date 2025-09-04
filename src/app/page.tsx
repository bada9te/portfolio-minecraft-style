"use client"
import Image from "next/image";
import MainMenuButton from "@/components/main-menu-btn/MainMenuButton";
import {Github} from "lucide-react";
import gsap from "gsap";
import {useEffect, useRef, useState} from "react";
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import InputBar from "@/components/input-bar/Input-bar";


export default function Home() {
    const helperTextRef = useRef<HTMLSpanElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [aboutMeModalIsOpened, setAboutMeModalIsOpen] = useState(false);
    const [projectsModalIsOpened, setProjectsModalIsOpened] = useState(false);


    const modalIsOpened = aboutMeModalIsOpened || projectsModalIsOpened;


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
        <div className={"relative font-minecraft bg-cover bg-no-repeat w-screen min-h-screen flex flex-col items-center overflow-hidden"}>
            <video src={"/bgs/panorama.mp4"} className={"absolute top-0 left-0 min-w-screen min-h-screen"} playsInline muted loop autoPlay/>

            <OverlayModal
                isOpen={aboutMeModalIsOpened}
                title={"About me"}
                closeButtonTitle={"Done"}
                onClose={() => setAboutMeModalIsOpen(false)}
            >
                <div className={"max-w-xl text-center"}>
                    <span>My name is Bohdan, I am a fullstack JavaScript / TypeScript developer, ready to contribute to your projects!</span>
                </div>
            </OverlayModal>


            <OverlayModal
                isOpen={projectsModalIsOpened}
                title={"Select project"}
                closeButtonTitle={"Back"}
                onClose={() => setProjectsModalIsOpened(false)}
                headerSearchBar={
                    <InputBar/>
                }
            >
                PROJECTS LIST
            </OverlayModal>


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
                >JS! JS! JS!</span>
            </div>


            <div className={`${modalIsOpened ? "opacity-0" : "opacity-100"} w-fit h-fit -mt-24 z-10`}>
                <div className={"flex flex-col items-center gap-3 w-full min-w-xl"}>
                    <MainMenuButton handleClickAction={() => setAboutMeModalIsOpen(true)}>About Me</MainMenuButton>
                    <MainMenuButton handleClickAction={() => setProjectsModalIsOpened(true)}>Projects</MainMenuButton>
                    <MainMenuButton handleClickAction={() => {}}>Tech Stack</MainMenuButton>
                </div>

                <div className={"flex flex-row justify-between gap-3 w-full min-w-xl mt-14"}>
                    <MainMenuButton handleClickAction={() => {}}>Contacts</MainMenuButton>
                    <MainMenuButton handleClickAction={() => {}}><Github size={28} className={"mr-2"}/>Github</MainMenuButton>
                </div>
            </div>

            <span className={`${modalIsOpened ? "opacity-0" : "opacity-100"} absolute bottom-3 left-3 text-2xl`}>Portfolio v0.1 (Modded)</span>
            <span className={`${modalIsOpened ? "opacity-0" : "opacity-100"} absolute bottom-3 right-3 text-2xl`}>bada9te.dev</span>
        </div>
    );
}
