import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import TopbarLayout from "../view/layout/Topbar.layout";
import type { QueryClient } from "@tanstack/react-query";
import { Link } from "lucide-react";
import AppLoader from "../view/components/AppLoader.component";
import AppError from "../view/components/AppError.component";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
  pendingComponent: AppLoader,
  errorComponent: AppError,
});

function RootComponent() {
  return (
    <>
      <TopbarLayout />
      <Outlet />
    </>
  );
}
