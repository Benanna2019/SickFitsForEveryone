import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root-route";
import ProductsPage from "../pages/ProductsPage";
import SingleProductPage from "../pages/SingleProductPage";
import * as z from "zod";

const productSearchSchema = z.object({
  page: z.number().catch(1),
});

export const productPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: productSearchSchema,
  component: () => {
    return <ProductsPage />;
  },
});

export const productIdPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: () => {
    return <SingleProductPage />;
  },
});
