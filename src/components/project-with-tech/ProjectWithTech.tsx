import Image from "next/image";
import Link from "next/link";

interface IProjectWithTechProps {
    title: string;
    index: number;
    link: string;
}

export default function ProjectWithTech({ title, index, link }: IProjectWithTechProps ) {

    const handleClickWithSound = () => {
        const audio = new Audio("/audio/menu_click.mp3");
        audio.play();
    }

    return (
        <Link href={link} target={"_blank"} onClick={handleClickWithSound} className={`
            h-[64px] w-full 
            bg-[#A19172] text-[#685E4A] border-4 border-[#E0CA9F] border-b-[#544C3B] border-r-[#544C3B]
            hover:bg-[#BE86B0] hover:border-l-[#FFB6F2] hover:border-t-[#FFB6F2] hover:text-[#FCFC66]
            text-xl cursor-pointer flex flex-row gap-4 items-start
            relative
        `}>
            <Image src={"/textures/level.webp"} alt={"level"} width={32} height={32} className={"w-8 h-8 ml-2 mt-2"}/>
            <span className={"text-xl text-[#B9FF7F] [text-shadow:_2px_2px_0_black,_-2px_-2px_0_black,_2px_-2px_0_black,_-2px_2px_0_black] -ml-6 mt-3"}>
                {index}
            </span>

            <span className={"absolute right-1 bottom-1 text-xl text-[#42FF00] [text-shadow:_3px_3px_0px_#143F00]"}>
                {Math.floor(Math.random() * 9) + 1}
            </span>

            {title}
        </Link>
    );
}