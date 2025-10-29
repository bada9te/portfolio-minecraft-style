// @ts-nocheck
"use client"
import { useEffect } from "react";
import Image from "next/image";

export default function CheckScreenOrientation() {
    return null;
    useEffect(() => {
        const message = document.querySelector(".portrait-message");

        if (!message) return;

        function checkOrientation() {
            if (window.matchMedia("(orientation: portrait)").matches) {
                // Portrait: show message, hide content
                message?.classList.add("flex");
                message?.classList.remove("hidden");
            } else {
                // Landscape: hide message, show content
                message?.classList.add("hidden");
                message?.classList.remove("flex");
            }
        }

        // Run on load
        checkOrientation();

        // Listen for orientation changes
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    return (
        <div className="portrait-message hidden absolute inset-0 bg-black font-minecraft top-0 left-0 w-full h-full flex-col justify-center items-center text-white text-center z-40">
          Please rotate your device to landscape mode...
            <Image src={"/bgs/heartbeat.gif"} alt={"heartbeat"} width={1000} height={700} className={"z-50 w-64 h-10 mt-3"}/>
        </div>
    );
}
