"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";

export default function About() {
    const router = useRouter();
    return (
        <OverlayModal title={"About me"} isOpen={true} onClose={() => router.push("/")} closeButtonTitle={"Done"}>
            <div className={"max-w-xl text-center"}>
                <span>My name is Bohdan, I am a fullstack JavaScript / TypeScript developer, ready to contribute to your projects!</span>
            </div>
        </OverlayModal>
    );
}