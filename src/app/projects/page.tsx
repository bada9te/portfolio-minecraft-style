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
    const [searchedProject, setSearchedProject] = useState<string | null>(null);


    return (
        <>
            <CheckScreenOrientation/>
            <OverlayModal
                isOpen={true}
                title={"Select project"}
                closeButtonTitle={"Back"}
                onClose={() => router.push("/")}
                headerSearchBar={
                    <div className={"hidden lg:flex w-full items-center justify-center"}><InputBar onInput={setSearchedProject}/></div>
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
                <div className={"w-full h-full overflow-y-scroll max-w-[844px] flex-col items-center gap-3 pt-6 px-10 hidden lg:flex"}>
                    {
                        projects
                            .filter((project) => searchedProject ? project.title.toLowerCase().includes(searchedProject) : true)
                            .map((item, index) => (
                            <ProjectAsWorld
                                key={index}
                                project={item}
                                isSelected={selectedProject?.title == item.title}
                                handleClick={() => setSelectedProject(item)}
                            />
                        ))
                    }
                </div>

                <div className={"w-full h-full overflow-y-scroll max-w-[844px] flex lg:hidden flex-col items-center gap-3 pt-6 px-10"}>
                    {
                        projects.map((item, index) => (
                            <ProjectAsWorld
                                key={index}
                                project={item}
                                isSelected={selectedProject?.title == item.title}
                                handleClick={() => setSelectedProject(item)}
                                selectionOpensWorld
                            />
                        ))
                    }
                </div>
            </OverlayModal>
        </>
    );
}