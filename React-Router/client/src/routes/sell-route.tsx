import { Route } from "@tanstack/react-router";
import SellPage from "../pages/SellPage";
import { rootRoute } from "./root-route";

export const sellRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/sell",
  component: () => <SellPage />,
});
