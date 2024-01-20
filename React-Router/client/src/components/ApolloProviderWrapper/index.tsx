import type { PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client";
import paginationField from "../../lib/paginationField";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            productsForHome: paginationField(),
          },
        },
      },
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
