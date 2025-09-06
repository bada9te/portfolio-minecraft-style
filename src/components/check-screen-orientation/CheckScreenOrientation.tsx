import { useEffect } from "react";

export default function CheckScreenOrientation() {
    useEffect(() => {
        const message = document.querySelector(".portrait-message");

        if (!message) return;

        function checkOrientation() {
            if (window.matchMedia("(orientation: portrait)").matches) {
                // Portrait: show message, hide content
                message.classList.add("opacity-100");
                message.classList.remove("opacity-0");
            } else {
                // Landscape: hide message, show content
                message.classList.add("opacity-0");
                message.classList.remove("opacity-100");
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
        <span className="portrait-message absolute inset-0 bg-black opacity-0 font-minecraft top-0 left-0 w-full h-full flex justify-center items-center text-white text-center z-50">
      Please rotate your device to landscape mode...
    </span>
    );
}
