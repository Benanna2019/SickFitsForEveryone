// import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import * as reactRouterDom from "react-router-dom";
import "./index.css";
import { ApolloProviderWrapper } from "./components/ApolloProviderWrapper";
import { SuperTokensWrapper } from "supertokens-auth-react";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
// import ErrorPage from "./error-page";
// import ProductsPage from "./pages/ProductsPage";
// import Root from "./pages/RootLayout";
// import SellPage from "./pages/SellPage";
// import SingleProductPage from "./pages/SingleProductPage";
import SuperTokens from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

import Session from "supertokens-auth-react/recipe/session";
import { CartStateProvider } from "./lib/cart-state";
// import OrdersPage from "./pages/OrdersPage";
// import OrderIdPage from "./pages/OrderIdPage";
// import AdminRoot from "./pages/AdminRoot";
// import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/lib/build/recipe/emailpassword/prebuiltui";
import { router } from "./routes";
import { RouterProvider } from "@tanstack/react-router";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "SickFits",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <React.StrictMode> */}
    {canHandleRoute([ThirdPartyEmailPasswordPreBuiltUI]) ? (
      // This renders the login UI on the /auth route
      getRoutingComponent([ThirdPartyEmailPasswordPreBuiltUI])
    ) : (
      <SuperTokensWrapper>
        <ApolloProviderWrapper>
          <CartStateProvider>
            <RouterProvider router={router} />
          </CartStateProvider>
        </ApolloProviderWrapper>
      </SuperTokensWrapper>
    )}
    {/* </React.StrictMode> */}
  </>
);

{
  /* <BrowserRouter>
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
                ThirdPartyEmailPasswordPreBuiltUI,
              ])}
              <Route element={<Root />} errorElement={<ErrorPage />}>
                <Route index element={<ProductsPage />} />
                <Route
                  path="/products/:productId"
                  element={<SingleProductPage />}
                />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/order" element={<OrdersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:orderId" element={<OrderIdPage />} />
              </Route>
              <Route path="/admin" element={<AdminRoot />} />
              {/*Your app routes*/
}
{
  /*  </Routes>
          </BrowserRouter> */
}
