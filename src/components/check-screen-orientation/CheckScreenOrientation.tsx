import { useEffect } from "react";

export default function CheckScreenOrientation() {
    useEffect(() => {
        const message = document.querySelector(".portrait-message");

        if (!message) return;

        function checkOrientation() {
            if (window.matchMedia("(orientation: portrait)").matches) {
                // Portrait: show message, hide content
                message?.classList.add("flex");
                message?.classList.remove("hidden");
            } else {
                // Landscape: hide message, show content
                message?.classList.add("hidden");
                message?.classList.remove("flex");
            }
        }

        // Run on load
        checkOrientation();

        // Listen for orientation changes
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    return (
        <span className="portrait-message absolute inset-0 bg-black font-minecraft top-0 left-0 w-full h-full justify-center items-center text-white text-center z-50">
          Please rotate your device to landscape mode...
        </span>
    );
}
