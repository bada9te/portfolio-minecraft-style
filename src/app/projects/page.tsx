"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";
import InputBar from "@/components/input-bar/Input-bar";
import {projects} from "@/static-data/projects";
import ProjectAsWorld from "@/components/project-as-world/ProjectAsWorld";
import {useState} from "react";

export default function Projects() {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);


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
    );
}