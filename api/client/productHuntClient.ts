import { GraphQLClient } from "graphql-request";

const API_URL = "https://api.producthunt.com/v2/api/graphql";

export function createProductHuntClient(
  token = process.env.PRODUCT_HUNT_TOKEN,
): GraphQLClient {
  if (!token) {
    throw new Error("PRODUCT_HUNT_TOKEN is not defined");
  }

  return new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}