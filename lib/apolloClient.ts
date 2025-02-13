/** @format */

import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  ssrMode: true,
  uri: `${process.env.SITE_BASE_URL ?? "http://localhost:3000"}/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
