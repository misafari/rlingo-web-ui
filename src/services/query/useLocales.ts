import type Locale from "../../types/locales/Locale.model";
import LocaleApi from "../api/Locale.api";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const localeApi = new LocaleApi();
const queryKey = "locales";

export const fetchAllLocalesOptions = (projectId: string) => {
  return {
    queryKey: [queryKey, projectId],
    queryFn: () => localeApi.getLocales(projectId),
  };
};

export const useSuspenseQueryGetAllLocales = (projectId: string) => {
  return useSuspenseQuery(fetchAllLocalesOptions(projectId));
};

export const useCreateLocale = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (locale: Pick<Locale, "projectId" | "locale" | "isDefault">) =>
      localeApi.createLocale(locale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, projectId] });
    },
  });
};
