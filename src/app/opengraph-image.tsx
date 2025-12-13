import { ImageResponse } from 'next/og'
import { headers } from 'next/headers'
import path from "node:path";
import * as fs from "node:fs";

export const alt = 'GreenTicket – Modern E-Ticketing Platform'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'
export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const fontPath = path.join(
    process.cwd(),
    'src/fonts/minecraft/minecraft_0.ttf'
);

const minecraftFont = fs.readFileSync(fontPath);

export default async function Image() {
    const fontData = await minecraftFont;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${siteUrl}/bgs/dirt.png)`,
                    color: '#fff',
                    fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    textAlign: 'center',
                    padding: '60px 80px',
                }}
            >
                {/* Logo / Title */}
                <img
                    src={`${siteUrl}/texts/main_menu.png`}
                    alt={"leaf"}
                    width={1000}
                    height={200}
                />

                {/* Tagline */}
                <div
                    style={{
                        paddingTop: "44px",
                        fontSize: 40,
                        fontWeight: 400,
                        lineHeight: 1.4,
                        maxWidth: '900px',
                        opacity: 0.9,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <span style={{ fontWeight: 'bold' }}>Some kind of projects collection.</span>
                    <br />
                    <span style={{ fontSize: 36 }}>
                        Contact info, projects, technologies - All in one place at portfolio.bada9te.dev
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Minecraft',
                    data: fontData,
                    weight: 400,
                    style: 'normal',
                },
            ],
        }
    )
}
