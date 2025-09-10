import {IEnchantmentTableProps} from "@/components/enchantment-table/EnchantmentTable";
import {useRouter} from "next/navigation";
import InventoryCell from "@/components/inventory-cell/InventoryCell";
import {technologies} from "@/static-data/technologies";
import Image from "next/image";
import {projects} from "@/static-data/projects";
import ProjectWithTech from "@/components/project-with-tech/ProjectWithTech";

export default function EnchantmentTableMobile({ placedTechnology, setPlacedTechnology, determineTooltip, techImages }: IEnchantmentTableProps){
    const router = useRouter();

    const handleClose = () => {
        const audio = new Audio("/audio/menu_click.mp3");
        audio.play().catch(console.error);

        router.push("/");
    }

    return (
        <div className={"absolute inset-0 w-screen h-screen bg-[#8A7F79] border-4 border-gray-700 border-l-white"}>
            <div className={"w-full h-full relative"}>
                <div className={`
                    absolute right-0 top-0 h-10 w-10 z-10 flex items-center justify-center 
                    bg-[#9C8A85] text-2xl border-4 border-l-[#B4A9A2] border-t-[#B4A9A2]
                    border-[#282727]
                `} onClick={() => handleClose()}>
                    x
                </div>
                <div className={"absolute inset-0 flex items-center justify-center w-full h-14 text-xl bg-[#7E777B] border-b-4 border-black"}>
                    Enchantment table
                </div>

                <div className={"w-full h-full pt-14 flex flex-row gap-0 items-center justify-center"}>
                    <div className={"w-full h-full flex flex-row gap-0 max-w-[660px]"}>
                        <div className={"w-[600px] flex flex-row flex-wrap mt-3 ml-4 max-h-[calc(100%-24px)] overflow-y-scroll"}>
                            {
                                Array.from({ length: 9 * 3 }).map((_, key) => {
                                    return (
                                        <InventoryCell
                                            key={key}
                                            enlarged={true}
                                            tooltip={technologies[key]?.title}
                                            isSelected={Boolean(technologies[key]?.image == placedTechnology && placedTechnology)}
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

                        <div className={"w-fit flex flex-col max-h-[calc(100%-24px)] mt-3"}>
                            {
                                placedTechnology
                                    ?
                                    <InventoryCell
                                        enlarged={true}
                                        tooltip={(() => {
                                            const key = technologies.find(t => t.image == placedTechnology);
                                            return key?.title;
                                        })()}
                                        isSelected={true}
                                        handleClick={() => setPlacedTechnology(null)} itemAsImage={
                                        <div className={"p-0"}>
                                            <img src={`/icons/${placedTechnology}`} alt={`selected_tech`} width={100} height={100}/>
                                        </div>
                                    }/>
                                    :
                                    <InventoryCell enlarged={true}/>
                            }
                            <InventoryCell tooltip={"Lapis Lazuli"} enlarged={true} itemAsImage={
                                <Image src={"/textures/lapis.webp"} alt={"lapis"} width={100} height={100}/>
                            }/>
                        </div>


                        <div className={"ml-10 w-full h-[200px] overflow-y-scroll mt-2 bg-[#534938] border-4 border-[#6D6149] border-r-white border-b-white mx-4"}>
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
                </div>
            </div>
        </div>
    );
}