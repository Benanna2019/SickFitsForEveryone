import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth",
});
