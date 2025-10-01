import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'bada9te.dev',
        short_name: 'b9t portfolio',
        description: 'Minecraft-styled bada9te.dev portfolio website',
        start_url: '/',
        display: 'fullscreen',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}