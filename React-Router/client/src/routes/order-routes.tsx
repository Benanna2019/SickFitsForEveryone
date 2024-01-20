import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import OrdersPage from "../pages/OrdersPage";
import OrderIdPage from "../pages/OrderIdPage";

export const allOrdersPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => <OrdersPage />,
});

export const orderDetailPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/orders/$orderId",
  component: () => <OrderIdPage />,
});
