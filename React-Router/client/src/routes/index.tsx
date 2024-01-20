import { Router } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import { productIdPage, productPage } from "./product-routes";
import { allOrdersPage, orderDetailPage } from "./order-routes";
import { sellRoute } from "./sell-route";
import { authRoute } from "./auth-route";

const routeTree = rootRoute.addChildren([
  productPage,
  productIdPage,
  allOrdersPage,
  orderDetailPage,
  sellRoute,
  authRoute,
]);

export const router = new Router({ routeTree });
