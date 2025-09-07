"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";

export default function About() {
    const router = useRouter();
    return (
        <>
            <CheckScreenOrientation/>
            <OverlayModal title={"About me"} isOpen={true} onClose={() => router.push("/")} closeButtonTitle={"Done"}>
                <div className={"max-w-xl text-center"}>
                    <span>My name is Bohdan, I am a fullstack JavaScript / TypeScript developer, ready to contribute to your projects!</span>
                </div>
            </OverlayModal>
        </>

    );
}