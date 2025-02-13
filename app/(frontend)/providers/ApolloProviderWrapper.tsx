/** @format */
"use client";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
