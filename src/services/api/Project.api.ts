import { type AxiosInstance } from "axios";
import api from "./config/AxiosConfig";
import type Project from "../../types/projects/Project.model";

export default class ProjectApi {
  private api: AxiosInstance;
  private readonly ENDPOINT = "/projects";

  constructor() {
    this.api = api;
  }

  public async getProjects() {
    return this.api
      .get<Project[]>(this.ENDPOINT)
      .then((response) => response.data);
  }

  public async getProjectById(id: string) {
    return this.api.get(`${this.ENDPOINT}/${id}`);
  }

  public async createProject(project: any) {
    return this.api.post(this.ENDPOINT, project);
  }

  public async updateProject(id: string, project: any) {
    return this.api.put(`${this.ENDPOINT}/${id}`, project);
  }

  public async deleteProject(id: string) {
    return this.api.delete(`${this.ENDPOINT}/${id}`);
  }
}
