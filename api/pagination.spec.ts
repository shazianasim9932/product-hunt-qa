import { test, expect } from "bun:test";
import { gql } from "graphql-request";
import dotenv from "dotenv";
import { createProductHuntClient } from "./client/productHuntClient";
import type { PaginationResponse } from "./types/productHunt";

dotenv.config();

test("should support post pagination", async () => {
  const client = createProductHuntClient();

  const query = gql`
    query {
      posts(first: 2) {
        edges {
          cursor
          node {
            id
            name
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const response = await client.request<PaginationResponse>(query);

  expect(response.posts.edges.length).toBeGreaterThan(0);
  expect(response.posts.edges.length).toBeLessThanOrEqual(2);

  expect(response.posts.pageInfo).toBeDefined();
  expect(response.posts.pageInfo.hasNextPage).toBeDefined();
  expect(response.posts.pageInfo.endCursor).toBeDefined();
});