import { ProjectPreview } from "@/components/editor/ProjectPreview";

export default async function UserProjectPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const [{ projectId }, { embed }] = await Promise.all([params, searchParams]);
  return <ProjectPreview projectId={projectId} embed={embed === "1"} />;
}