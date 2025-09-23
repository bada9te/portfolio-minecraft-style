"use client"
import {useEffect, useState} from "react";
import Image from "next/image";

export default function SwitchFullscreen() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [mounted, setMounted] = useState(null);

    useEffect(() => {
        const handle = (e) => {
            setIsFullScreen(false)
        }
        document.addEventListener("visibilitychange", handle);

        return () => {
            document.removeEventListener("visibilitychange", handle);
        }
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Get the root element (whole page)
    let elem = document.documentElement;

    // Request fullscreen
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }

        setIsFullScreen(true);
    }

    // Exit fullscreen
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }

        setIsFullScreen(false);
    }


    return (
        <button
            onClick={isFullScreen ? closeFullscreen : openFullscreen}
            className={"cursor-pointer absolute top-3 left-2 z-50 bg-[#706E6D] border-3 border-white border-b-gray-700 border-r-gray-700 w-7 h-7"}
        >
            <Image src={isFullScreen ? "/textures/fullscreen_off.png" : "/textures/fullscreen_on.png"} alt={"fullscreen_on"} width={100} height={100} />
        </button>
    );
}