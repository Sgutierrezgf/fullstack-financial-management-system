import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: '/api/graphql/graphql',
  cache: new InMemoryCache(),
});

export default client;