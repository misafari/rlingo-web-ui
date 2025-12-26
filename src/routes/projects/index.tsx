import { createFileRoute } from "@tanstack/react-router";
import ProjectListPage from "../../view/pages/projects/list/Project.list.page";
import { fetchAllProjectsOptions } from "../../services/query/useProjects";

export const Route = createFileRoute("/projects/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchAllProjectsOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ProjectListPage />;
}
