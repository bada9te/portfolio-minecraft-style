"use client"
import OverlayModal from "@/components/overlay-modal/OverlayModal";
import {useRouter} from "next/navigation";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";
import Image from "next/image";


const tableDataLanguages = [
    { title: "JavaScript", experience: 10, file: "js.png"       },
    { title: "TypeScript", experience: 10, file: "ts.png"       },
    { title: "Python",     experience: 9,  file: "python.png"   },
    { title: "Solidity",   experience: 8,  file: "solidity.png" },
];

const tableDataFrameworksAndLibs = [
    { title: "HTML", experience: 10, file: "html5.png" },
    { title: "CSS",  experience: 10, file: "css.png" },
    { title: "Tailwind css", experience: 10, file: "tailwind.png" },
    { title: "DaisyUI", experience: 10, file: "daisyui.png" },
    { title: "Docker", experience: 7, file: "docker.png" },
    { title: "MongoDB", experience: 9, file: "mongodb.png" },
    { title: "NodeJS", experience: 8, file: "nodejs.png" },
    { title: "PassportJS", experience: 9, file: "passportjs.png" },
    { title: "React", experience: 10, file: "react.png" },
    { title: "ViteJS", experience: 10, file: "vitejs.png" },
    { title: "Express", experience: 10, file: "expressjs.png" },
    { title: "NestJS", experience: 8, file: "nestjs.png" },
    { title: "NextJS", experience: 10, file: "nextjs.png" },
    { title: "Git", experience: 10, file: "git.png" },
    { title: "Discord.js", experience: 6, file: "discord.png" },
    { title: "Telegram SDK", experience: 6, file: "telegram.jpg" },
];


const tableDataMisc = [
    { title: "Github", experience: 10, file: "github.png" },
    { title: "Gitlab", experience: 7, file: "gitlab.png" },
    { title: "Jira", experience: 7, file: "jira.png" },
    { title: "Linux (deb)", experience: 7, file: "linux.png" },
];


export default function About() {
    const router = useRouter();
    return (
        <>
            <CheckScreenOrientation/>
            <OverlayModal title={"About me"} isOpen={true} onClose={() => router.push("/")} closeButtonTitle={"Done"}>
                <div className={"max-w-xl text-start flex flex-col gap-2 h-full overflow-y-scroll py-20 text-sm md:text-md portrait:px-5 landscape:px-0"}>
                    <div className={"w-full items-center justify-center flex mt-4"}>
                        <Image src={"/textures/villager_head.png"} alt={"pickaxe"} width={64} height={64}/>
                    </div>

                    <span>My name is Bohdan, I am a fullstack JavaScript / TypeScript developer.</span>
                    <span>2+ years of commercial experience (as a fullstack web including Web-3). </span>
                    <span>Ready to contribute to your projects! </span>

                    <div className={"w-full items-center justify-center flex mt-4"}>
                        <Image src={"/textures/pickaxe.webp"} alt={"pickaxe"} width={64} height={64}/>
                    </div>

                    <table>
                        <caption>Programming languages</caption>
                        <thead>
                            <tr>
                                <th className={"text-start"}>Lang</th>
                                <th className={"text-start"}>Name</th>
                                <th className={"text-start"}>Experience (0-10)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tableDataLanguages
                                    .sort((a, b) => b.experience - a.experience)
                                    .map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><Image src={`/icons/${item.file}`} alt={`${item.file}_${i}`} width={28} height={28}/></td>
                                            <th scope={"row"} className={"text-start"}>{item.title}</th>
                                            <td className={"text-start"}>{item.experience}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>


                    <div className={"w-full items-center justify-center flex mt-4"}>
                        <Image src={"/textures/crafting_table.webp"} alt={"crafting_table"} width={64} height={64}/>
                    </div>

                    <table>
                        <caption>
                            Libs / Frameworks / Tools
                        </caption>
                        <thead>
                            <tr>
                                <th className={"text-start"}>Tech</th>
                                <th className={"text-start"}>Tech title</th>
                                <th className={"text-start"}>Experience (0-10)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tableDataFrameworksAndLibs
                                    .sort((a, b) => b.experience - a.experience)
                                    .map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><Image src={`/icons/${item.file}`} alt={`${item.file}_${i}`} width={28} height={28}/></td>
                                            <th scope={"row"} className={"text-start"}>{item.title}</th>
                                            <td className={"text-start"}>{item.experience}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>


                    <div className={"w-full items-center justify-center flex mt-4"}>
                        <Image src={"/textures/water_bucket.webp"} alt={"pickaxe"} width={64} height={64}/>
                    </div>

                    <table>
                        <caption>Miscellaneous</caption>
                        <thead>
                            <tr>
                                <th className={"text-start"}>Misc</th>
                                <th className={"text-start"}>Misc title</th>
                                <th className={"text-start"}>Experience (0-10)</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            tableDataMisc
                                .sort((a, b) => b.experience - a.experience)
                                .map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td><Image src={`/icons/${item.file}`} alt={`${item.file}_${i}`} width={28} height={28}/></td>
                                        <th scope={"row"} className={"text-start"}>{item.title}</th>
                                        <td className={"text-start"}>{item.experience}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>

                </div>
            </OverlayModal>
        </>

    );
}