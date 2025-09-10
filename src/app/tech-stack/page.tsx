"use client"
import {useEffect, useState} from "react";
import {technologies} from "@/static-data/technologies";
import CheckScreenOrientation from "@/components/check-screen-orientation/CheckScreenOrientation";
import EnchantmentTable from "@/components/enchantment-table/EnchantmentTable";
import EnchantmentTableMobile from "@/components/enchantment-table/EnchantmentTableMobile";


export default function TechStack() {
    const [placedTechnology, setPlacedTechnology] = useState<string | null>(null);
    const [typeView, setTypeView] = useState<"pc" | "mobile">("pc");

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


    useEffect(() => {
        function checkView() {
            const isLandscape = window.matchMedia("(orientation: landscape)").matches;
            const width = window.innerWidth;

            // You can tune these breakpoints depending on your design
            if (width < 768) {
                // Always mobile under 768px
                setTypeView("mobile");
            } else if (isLandscape && width < 966) {
                // Portrait mode but not wide enough to be "real pc"
                setTypeView("mobile");
            } else {
                setTypeView("pc");
            }
        }

        // Run on load
        checkView();

        // Listen for resize/orientation changes
        window.addEventListener("resize", checkView);
        window.addEventListener("orientationchange", checkView);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkView);
            window.removeEventListener("orientationchange", checkView);
        };
    }, []);


    console.log({ typeView })

    return (
        <>
            <CheckScreenOrientation/>

            {
                typeView == "mobile" &&
                <EnchantmentTableMobile
                    placedTechnology={placedTechnology}
                    setPlacedTechnology={setPlacedTechnology}
                    determineTooltip={determineTooltip}
                    techImages={techImages}
                />
            }

            {
                typeView === "pc" &&
                <EnchantmentTable
                    placedTechnology={placedTechnology}
                    setPlacedTechnology={setPlacedTechnology}
                    determineTooltip={determineTooltip}
                    techImages={techImages}
                />
            }

        </>
    );
}