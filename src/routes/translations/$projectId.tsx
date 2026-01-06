import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  fetchAllLocalesOptions,
  useSuspenseQueryGetAllLocales,
} from "../../services/query/useLocales";
import TranslationManager from "../../view/pages/translation/translation-manager";

export const Route = createFileRoute("/translations/$projectId")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(
      fetchAllLocalesOptions(params.projectId as string)
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ from: "/translations/$projectId" });
  const { data } = useSuspenseQueryGetAllLocales(projectId as string);
  return <TranslationManager locales={data ?? []} />;
}
