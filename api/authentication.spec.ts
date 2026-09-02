import { test, expect } from "bun:test";
import { gql } from "graphql-request";
import dotenv from "dotenv";
import { createProductHuntClient } from "./client/productHuntClient";

dotenv.config();

test("should reject an invalid access token", async () => {
  const client = createProductHuntClient("invalid-token");

  const query = gql`
    query {
      posts(first: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  try {
    await client.request(query);

    throw new Error("Expected request to be rejected");
  } catch (error) {
    expect(error).toBeDefined();

    const message = String(error);

    expect(message).toContain("401");
  }
});