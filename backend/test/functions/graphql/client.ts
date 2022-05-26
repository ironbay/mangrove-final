import { Chain, useZeusVariables } from "@mangrove/graphql/zeus";

const chain = Chain("https://b08531nku7.execute-api.us-east-1.amazonaws.com");

export const Client = {
  query: chain("query"),
  mutation: chain("mutation"),
};
