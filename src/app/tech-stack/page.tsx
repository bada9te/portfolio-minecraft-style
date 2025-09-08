"use client"
import {useRouter} from "next/navigation";
import Image from "next/image";
import ProjectWithTech from "@/components/project-with-tech/ProjectWithTech";
import InventoryCell from "@/components/inventory-cell/InventoryCell";
import {useState} from "react";
import {technologies} from "@/static-data/technologies";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";
import EnchantmentTable from "@/components/enchantment-table/EnchantmentTable";
import EnchantmentTableMobile from "@/components/enchantment-table/EnchantmentTableMobile";


export default function TechStack() {
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
        <>
            <CheckScreenOrientation/>

            <EnchantmentTableMobile
                placedTechnology={placedTechnology}
                setPlacedTechnology={setPlacedTechnology}
                determineTooltip={determineTooltip}
                techImages={techImages}
            />
        </>
    );
}