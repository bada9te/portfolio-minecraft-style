import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import "./globals.css";
import SwitchFullscreen from "@/components/switch-fullscreen/SwitchFullscreen";

const minecraftFont = localFont({
    src: "../fonts/minecraft/minecraft_0.ttf",
    variable: "--font-minecraft",
});

export const metadata: Metadata = {
    title: "bada9te.dev",
    description: "Minecraft-styled bada9te's portfolio website",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${minecraftFont.variable} antialiased`}
      >
      <div
          className={"content-block text-white relative font-minecraft bg-no-repeat w-screen min-h-screen flex flex-col items-center overflow-hidden"}>
          <SwitchFullscreen/>
          <div
              style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: -99,
                  overflow: "hidden",
                  pointerEvents: "none",
              }}
          >
              <iframe
                  src="https://www.youtube.com/embed/JBoUwElRFVM?autoplay=1&mute=1&start=1200&controls=0&autohide=1&loop=1&playlist=JBoUwElRFVM&modestbranding=1"
                  allow="autoplay"
                  frameBorder="0"
                  style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100vw",
                      height: "56.25vw", // 16:9
                      minWidth: "177.78vh", // 16:9 inverse
                      minHeight: "100vh",
                      transform: "translate(-50%, -50%) scale(1.15)",
                  }}
              />
          </div>



          {children}
      </div>
      </body>
    </html>
  );
}
