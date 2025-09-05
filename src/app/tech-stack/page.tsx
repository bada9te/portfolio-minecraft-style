"use client"
import {useRouter} from "next/navigation";
import Image from "next/image";
import ProjectWithTech from "@/components/project-with-tech/ProjectWithTech";
import InventoryCell from "@/components/inventory-cell/InventoryCell";
import {useState} from "react";
import {technologies} from "@/static-data/technologies";
import {projects} from "@/static-data/projects";


export default function TechStack() {
    const router = useRouter();

    const [placedTechnology, setPlacedTechnology] = useState<string | null>(null);

    const techImages = technologies.map(
        (technology) => `https://cdn.simpleicons.org/${technology.image}/${technology.image}`,
    );

    const formatTextNormalized = (text: string) => {
        return `${text[0].toUpperCase()}${text.slice(1, text.length)}`;
    }

    const determineTooltip = (imageUrl: string) => {
        try {
            const tech = String(imageUrl.split("/")[imageUrl.split("/").length - 1]);
            return formatTextNormalized(tech);
        } catch (e) {
            return "";
        }
    }

    return (
        <div className={"w-screen h-screen relative"}>
            <div className={"absolute inset-0 bg-black/50 cursor-pointer"} onClick={() => router.push("/")}></div>
            <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-fit bg-[#C7C7C7] border-3 border-black"}>
                <div className={"w-full h-full flex flex-col items-center justify-start gap-4 border-4 border-white border-b-gray-700 border-r-gray-700"}>
                    <span className={"text-[#414141] w-full text-start p-3 text-2xl"}>Enchant</span>
                    <div className={"flex flex-row items-stretch w-full"}>
                        <div className={"w-[40%] h-full flex flex-col items-center justify-center gap-3"}>

                            {
                                !placedTechnology
                                    ?
                                    <Image src={"/textures/enchantment_book_closed.png"} alt={"book_closed"} width={88} height={88} className={"-mt-4 h-24 w-14"}/>
                                    :
                                    <Image src={"/textures/enchantment_book_opened.png"} alt={"book_opened"} width={144} height={88} className={"-mt-4 h-24 w-28"}/>
                            }


                            <div className={"flex flex-row"}>
                                {
                                    placedTechnology
                                        ?
                                        <InventoryCell tooltip={determineTooltip(placedTechnology)} isSelected={true} handleClick={() => setPlacedTechnology(null)} itemAsImage={
                                            <div className={"p-0"}>
                                                <img src={`/icons/${placedTechnology}`} alt={`selected_tech`} width={100} height={100}/>
                                            </div>
                                        }/>
                                        :
                                        <InventoryCell/>
                                }
                                <InventoryCell tooltip={"Lapis Lazuli"} itemAsImage={
                                    <Image src={"/textures/lapis.webp"} alt={"lapis"} width={100} height={100}/>
                                }/>
                            </div>
                        </div>

                        <div className={"w-[60%] h-[200px] overflow-y-scroll -mt-12 bg-[#534938] border-4 border-[#6D6149] border-r-white border-b-white mr-4"}>
                            {
                                !placedTechnology
                                    ?
                                    <div className={"w-full h-full flex items-center justify-center text-xl"}>
                                        Select technology
                                    </div>
                                    :
                                    <>
                                        {
                                            (() => {
                                                const projectsFiltered = projects.filter(
                                                    p => p.technologies.includes(
                                                        placedTechnology.split(".")[0]
                                                    )
                                                );

                                                if (projectsFiltered.length) {
                                                    return projectsFiltered.map((project, key) => (
                                                        <ProjectWithTech link={project.github} title={project.title} index={key + 1} key={key} />
                                                    ))
                                                }

                                                return (
                                                    <div className={"w-full h-full flex items-center justify-center text-xl"}>
                                                        No config for this tech
                                                    </div>
                                                );
                                            })()
                                        }
                                    </>
                            }

                        </div>
                    </div>

                    <span className={"text-[#414141] w-full text-start px-3 text-2xl -mt-2"}>Technologies</span>
                    <div className={"flex flex-row items-center flex-wrap px-3 -mt-1 max-h-[178.5px]"}>
                        {
                            Array.from({ length: 9 * 3 }).map((_, key) => {
                                return (
                                    <InventoryCell
                                        key={key}
                                        tooltip={technologies[key]?.title}
                                        isSelected={technologies[key]?.image == placedTechnology}
                                        handleClick={() => setPlacedTechnology(technologies[key]?.image)}
                                        itemAsImage={
                                            technologies[key]?.image ?
                                            <div className={"p-0"}>
                                                <img src={`/icons/${technologies[key]?.image}`} alt={`tech_${key}`} width={100} height={100}/>
                                            </div> :
                                                undefined
                                        }
                                    />
                                );
                            })
                        }
                    </div>

                    <div className={"flex flex-row items-center flex-wrap px-3 pb-4"}>
                        {
                            Array.from({ length: 9}).map((_, key) => {
                                return (
                                    <div key={key}>
                                        {
                                            techImages[9*3+key] ?
                                            <InventoryCell
                                                tooltip={determineTooltip(techImages[9*3+key])}
                                                isSelected={technologies[9*3 + key].image == placedTechnology}
                                                handleClick={() => setPlacedTechnology(technologies[9*3 + key].image)}
                                                itemAsImage={
                                                    <div className={"p-0"}>
                                                        <img src={`/icons/${technologies[9*3 + key]?.image}`} alt={`tech_${key}`} width={100} height={100}/>
                                                    </div>
                                                }
                                            /> :
                                            <InventoryCell key={key}/>
                                        }
                                    </div>

                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}