"use client"
import {useEffect, useState} from "react";
import Image from "next/image";

export default function SwitchFullscreen() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Detect iOS
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);

        // Set initial fullscreen state
        checkFullscreen();

        // Add event listeners for fullscreen changes
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleFullscreenChange = () => {
        checkFullscreen();
    };

    const checkFullscreen = () => {
        const fullscreenElement =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;

        setIsFullScreen(!!fullscreenElement);
    };

    // Request fullscreen
    const openFullscreen = async () => {
        try {
            const elem = document.documentElement;

            // iOS specific handling
            if (isIOS) {
                // Show iOS-specific instructions
                alert("On iOS, fullscreen may have limitations:\n- Only available on iPad\n- May show overlay button\n- Swipe down to exit");
                return;
            }

            console.log("ENTER fullscreen");

            let shouldFallback = true;

            if (elem.requestFullscreen) {
                await elem.requestFullscreen().catch(console.log); shouldFallback = false;
            }
            if (elem.webkitRequestFullscreen) {
                await elem.webkitRequestFullscreen(); shouldFallback = false;
            }
            if (elem.mozRequestFullScreen) {
                await elem.mozRequestFullScreen().catch(console.log); shouldFallback = false;
            }

            if (elem.msRequestFullscreen) {
                await elem.msRequestFullscreen().catch(console.log); shouldFallback = false;
            }


            if (shouldFallback) {
                throw new Error("Fullscreen not supported");
            }

            setIsFullScreen(true);
        } catch (error) {
            console.error("Fullscreen error:", error);
            // Fallback for iOS or unsupported browsers
            handleFallbackFullscreen();
        }
    };

    // Exit fullscreen
    const closeFullscreen = async () => {
        try {
            console.log("EXIT fullscreen");

            if (document.exitFullscreen) {
                await document.exitFullscreen().catch(console.log);
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen().catch(console.log);
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen().catch(console.log);
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen().catch(console.log);
            }

            setIsFullScreen(false);
        } catch (error) {
            console.error("Exit fullscreen error:", error);
            setIsFullScreen(false);
        }
    };

    // Fallback for unsupported browsers (especially iOS)
    const handleFallbackFullscreen = () => {
        if (isIOS) {
            // iOS fallback - use CSS to simulate fullscreen
            document.documentElement.style.position = 'fixed';
            document.documentElement.style.top = '0';
            document.documentElement.style.left = '0';
            document.documentElement.style.width = '100%';
            document.documentElement.style.height = '100%';
            document.documentElement.style.overflow = 'hidden';
            setIsFullScreen(true);

            // Add escape handler for iOS
            const handleEscape = (e) => {
                if (e.key === 'Escape' || e.keyCode === 27) {
                    closeFallbackFullscreen();
                }
            };
            document.addEventListener('keydown', handleEscape);
        }
    };

    const closeFallbackFullscreen = () => {
        document.documentElement.style.position = '';
        document.documentElement.style.top = '';
        document.documentElement.style.left = '';
        document.documentElement.style.width = '';
        document.documentElement.style.height = '';
        document.documentElement.style.overflow = '';
        setIsFullScreen(false);
    };

    const toggleFullscreen = () => {
        if (isFullScreen) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
    };

    // Don't render until mounted to avoid hydration issues
    if (!mounted) {
        return (
            <button className="cursor-pointer absolute top-3 left-2 z-50 bg-[#706E6D] border-3 border-white border-b-gray-700 border-r-gray-700 w-7 h-7">
                {/* Loading state */}
            </button>
        );
    }

    return (
        <div className="relative w-full">
            <button
                onClick={toggleFullscreen}
                className="cursor-pointer absolute top-3 left-2  z-50 bg-[#706E6D] border-3 border-white border-b-gray-700 border-r-gray-700 w-7 h-7 flex items-center justify-center"
                title={isIOS ? "Limited fullscreen support on iOS" : "Toggle fullscreen"}
            >
                <Image
                    src={isFullScreen ? "/textures/fullscreen_off.png" : "/textures/fullscreen_on.png"}
                    alt={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                    width={20}
                    height={20}
                    className="w-4 h-4"
                />
            </button>

            {/* iOS warning badge */}
            {isIOS && !isFullScreen && (
                <div className="absolute top-10 left-2 bg-yellow-500 text-black font-bold text-md px-2 py-1 rounded z-50">
                    iOS Limited
                </div>
            )}
        </div>
    );
}