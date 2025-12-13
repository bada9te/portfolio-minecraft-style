import MainMenuButton from "@/components/main-menu-btn/MainMenuButton";
import {ReactNode} from "react";

interface IOverlayModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    closeButtonTitle: string;
    children: ReactNode;
    headerSearchBar?: ReactNode;
    additionalButtons?: ReactNode;
}

export default function OverlayModal({ title, onClose, isOpen, closeButtonTitle, children, headerSearchBar, additionalButtons }: IOverlayModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-30">
            <div className="grid w-full h-full landscape:grid-rows-[15%_65%_20%] portrait:grid-rows-[15%_70%_15%]">
                <div className="backdrop-blur-sm flex flex-col items-center justify-center text-2xl gap-2">
                    <span className={"[text-shadow:_3px_3px_0px_black]"}>{title}</span>
                    {headerSearchBar}
                </div>
                <div className="border-t-3 border-b-3 border-white/30 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-xl">
                    {children}
                </div>

                <div className="backdrop-blur-sm flex flex-col items-center justify-center portrait:px-10">
                    <div className={"flex flex-row items-center justify-center gap-3 w-full max-w-xl h-full"}>
                        {additionalButtons}
                        <MainMenuButton handleClickAction={onClose}>{closeButtonTitle}</MainMenuButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
