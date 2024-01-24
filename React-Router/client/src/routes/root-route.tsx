import { RootRoute } from "@tanstack/react-router";
import RootLayout from "../pages/RootLayout";

export const rootRoute = new RootRoute({
  component: () => <RootLayout />,
});
