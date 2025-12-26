import { Outlet, createRootRoute } from "@tanstack/react-router";
import TopbarLayout from "../view/layout/Topbar.layout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <TopbarLayout />
      <Outlet />
    </>
  );
}
