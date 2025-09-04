"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Contacts() {
    const router = useRouter();
    return (
        <OverlayModal
            isOpen={true}
            title={"Contacts"}
            closeButtonTitle={"Acknowledged"}
            onClose={() => router.push("/")}
        >
            <div className={"w-full max-w-xl flex flex-col items-center justify-center gap-4"}>
                <Link href={"/"} target={"_blank"} className={"flex flex-row gap-4 items-center justify-center hover:text-indigo-400"}>
                    <Image src={"/icons/telegram.jpg"} alt={"instagram"} width={100} height={100} className={"w-10 rounded-full"}/>
                    bada9te
                </Link>

                <Link href={"/"} target={"_blank"} className={"flex flex-row gap-4 items-center justify-center hover:text-indigo-400"}>
                    <Image src={"/icons/instagram.png"} alt={"instagram"} width={100} height={100} className={"w-10"}/>
                    bada9te
                </Link>

                <Link href={"/"} target={"_blank"} className={"flex flex-row gap-4 items-center justify-center hover:text-indigo-400"}>
                    <Image src={"/icons/discord.png"} alt={"instagram"} width={100} height={100} className={"w-10 rounded-full"}/>
                    bada9te
                </Link>
            </div>
        </OverlayModal>
    );
}