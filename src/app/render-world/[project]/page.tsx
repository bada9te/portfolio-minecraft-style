// src/app/render-world/[project]/page.tsx
import { projects } from "@/static-data/projects";
import RenderWorldClient from "./RenderWorldClient";

export async function generateStaticParams() {
    return projects.map((p) => ({
        project: p.title.replaceAll(" ", ""),
    }));
}

export default function RenderWorldPage({
                                            params,
                                        }: {
    params: { project: string };
}) {
    const targetProject = projects.find(
        (i) => i.title.replaceAll(" ", "") === params.project
    );

    return (
        <RenderWorldClient project={params.project} targetProject={targetProject} />
    );
}
