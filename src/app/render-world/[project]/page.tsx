// src/app/render-world/[project]/page.tsx
import { projects } from "@/static-data/projects";
import RenderWorldClient from "./RenderWorldClient";

export async function generateStaticParams() {
    return projects.map((p) => ({
        project: p.title.replaceAll(" ", ""),
    }));
}

export default async function RenderWorldPage({
    params,
}: {
    params: Promise<{ project: string }>;
}) {
    const { project } = await params;

    const targetProject = projects.find(
        (i) => i.title.replaceAll(" ", "") === project
    );

    return (
        <RenderWorldClient
            project={project}
            targetProject={targetProject}
        />
    );
}
