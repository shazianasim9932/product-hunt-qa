import { test, expect } from "bun:test";
import { gql } from "graphql-request";
import dotenv from "dotenv";
import { createProductHuntClient } from "./client/productHuntClient";

dotenv.config();

test("should return an error for an invalid GraphQL field", async () => {
  const client = createProductHuntClient();

  const query = gql`
    query {
      posts(first: 1) {
        edges {
          node {
            id
            invalidField
          }
        }
      }
    }
  `;

  try {
    await client.request(query);

    throw new Error("Expected GraphQL request to fail");
  } catch (error) {
    expect(error).toBeDefined();

    const message = String(error);

    expect(message).toContain("invalidField");
  }
});