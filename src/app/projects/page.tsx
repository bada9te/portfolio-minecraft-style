"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";
import InputBar from "@/components/input-bar/Input-bar";
import {projects} from "@/static-data/projects";
import ProjectAsWorld from "@/components/project-as-world/ProjectAsWorld";
import {useState} from "react";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";
import MainMenuButton from "@/components/main-menu-btn/MainMenuButton";
import Link from "next/link";

export default function Projects() {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);


    return (
        <>
            <CheckScreenOrientation/>
            <OverlayModal
                isOpen={true}
                title={"Select project"}
                closeButtonTitle={"Back"}
                onClose={() => router.push("/")}
                headerSearchBar={
                    <InputBar/>
                }
                additionalButtons={
                    <Link href={selectedProject?.github || ""} target={"_blank"} className={"w-full"}>
                        <MainMenuButton
                            handleClickAction={() => {}}
                            disabled={selectedProject == null}
                        >
                            Github
                        </MainMenuButton>
                    </Link>
                }
            >
                <div className={"w-full h-full overflow-y-scroll max-w-[844px] flex flex-col gap-3 pt-6"}>
                    {
                        projects.map((item, index) => (
                            <ProjectAsWorld
                                key={index}
                                project={item}
                                isSelected={selectedProject?.title == item.title}
                                handleClick={() => setSelectedProject(item)}
                            />
                        ))
                    }
                </div>
            </OverlayModal>
        </>
    );
}