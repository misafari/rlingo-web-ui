import { useSuspenseQuery } from "@tanstack/react-query";
import ProjectApi from "../api/Project.api";

const projectApi = new ProjectApi();
const queryKey = "projects";

export const fetchAllProjectsOptions = {
  queryKey: [queryKey],
  queryFn: () => projectApi.getProjects(),
};

export const useAllProjects = () => {
  return useSuspenseQuery(fetchAllProjectsOptions);
};
