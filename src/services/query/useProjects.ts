import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ProjectApi from "../api/Project.api";
import type Project from "../../types/projects/Project.model";

const projectApi = new ProjectApi();
const queryKey = "projects";

export const fetchAllProjectsOptions = {
  queryKey: [queryKey],
  queryFn: () => projectApi.getProjects(),
};

export const useAllProjects = () => {
  return useSuspenseQuery(fetchAllProjectsOptions);
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Pick<Project, "name">) =>
      projectApi.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      project,
    }: {
      id: string;
      project: Pick<Project, "name">;
    }) => projectApi.updateProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectApi.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};
