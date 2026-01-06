import { type AxiosInstance } from "axios";
import api from "./config/AxiosConfig";
import type Locale from "../../types/locales/Locale.model";

export default class LocaleApi {
  private api: AxiosInstance;
  private readonly ENDPOINT = "/locales";

  constructor() {
    this.api = api;
  }

  public async createLocale(
    locale: Pick<Locale, "projectId" | "locale" | "isDefault">
  ) {
    return this.api
      .post<Locale>(this.ENDPOINT, locale)
      .then((response) => response.data);
  }

  public async updateLocale(
    id: string,
    locale: Pick<Locale, "projectId" | "locale" | "isDefault">
  ) {
    return this.api
      .put<Locale>(`${this.ENDPOINT}/${id}`, locale)
      .then((response) => response.data);
  }

  public async deleteLocale(id: string) {
    return this.api
      .delete<Locale>(`${this.ENDPOINT}/${id}`)
      .then((response) => response.data);
  }

  public async getLocales(projectId: string) {
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    return this.api
      .get<Locale[]>(`${this.ENDPOINT}/project/${projectId}`)
      .then((response) => response.data);
  }
}
