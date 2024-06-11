import "@/styles/globals.css";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ApolloProvider>
  );
}
