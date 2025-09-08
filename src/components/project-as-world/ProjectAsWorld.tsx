import {projects} from "@/static-data/projects";
import Image from "next/image";

type TProjectAsWorldProps = typeof projects[0];

interface IProjectAsWorldStateProps {
    project: TProjectAsWorldProps;
    isSelected: boolean;
    handleClick: () => void;
}

export default function ProjectAsWorld({ project, isSelected, handleClick }: IProjectAsWorldStateProps) {
    return (
        <div
            className={`
                group
                relative w-full h-fit p-1 flex flex-row items-start justify-start border-4
                ${isSelected ? "border-white bg-black" : "border-transparent"}
            `}
            onClick={handleClick}
        >
            <Image src={project.icon} alt={`logo_${project.title}`} width={500} height={500} className={"w-24 h-24 lg:w-32 lg:h-32"}/>

            <div className={"w-24 h-24 lg:w-32 lg:h-32 bg-white/50 absolute left-1 top-1 hidden group-hover:block"}>
                <div className={"w-full h-full flex items-center justify-center relative"}>
                    <Image
                        src={"/textures/play_blue.png"}
                        alt={"play_gray"}
                        width={500}
                        height={500}
                        className={"w-16 h-16 opacity-0 hover:opacity-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"}
                    />

                    <Image src={"/textures/play_gray.png"} alt={"play_gray"} width={500} height={500} className={"w-16 h-16"}/>
                </div>
            </div>

            <div className={"flex flex-col gap-2 w-full ml-2"}>
                <span className={"text-xl lg:text-2xl text-white"}>{project.title}</span>
                <span className={"text-lg lg:text-2xl text-white/50"}>{project.description.slice(0, 70)}...</span>
            </div>

        </div>
    );
}