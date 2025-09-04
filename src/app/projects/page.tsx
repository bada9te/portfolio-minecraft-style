"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";
import InputBar from "@/components/input-bar/Input-bar";

export default function Projects() {
    const router = useRouter();
    return (
        <OverlayModal
            isOpen={true}
            title={"Select project"}
            closeButtonTitle={"Back"}
            onClose={() => router.push("/")}
            headerSearchBar={
                <InputBar/>
            }
        >
            PROJECTS LIST
        </OverlayModal>
    );
}