import { EditorShell } from "@/components/editor/EditorShell";

export default async function UserProjectEditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <EditorShell projectId={projectId} />;
}