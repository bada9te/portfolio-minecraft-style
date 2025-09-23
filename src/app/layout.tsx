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
        <div className={"content-block text-white relative font-minecraft bg-cover bg-no-repeat w-screen min-h-screen flex flex-col items-center overflow-hidden"}>
          <SwitchFullscreen/>
            <video src={"/bgs/panorama.mp4"} className={"absolute top-0 left-0 min-w-screen min-h-screen object-cover"} playsInline muted loop autoPlay/>
            {children}
        </div>
      </body>
    </html>
  );
}
