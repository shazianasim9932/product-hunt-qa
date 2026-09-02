import { test, expect } from "bun:test";
import { gql } from "graphql-request";
import dotenv from "dotenv";
import { createProductHuntClient } from "./client/productHuntClient";
import type {
  NextPageResponse,
  PostsPageResponse,
} from "./types/productHunt";

dotenv.config();

test("should fetch the next page using the end cursor", async () => {
  const client = createProductHuntClient();

  const firstPageQuery = gql`
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

  const firstPage = await client.request<NextPageResponse>(
  firstPageQuery
);

  expect(firstPage.posts.edges.length).toBeGreaterThan(0);

  const endCursor = firstPage.posts.pageInfo.endCursor;

  expect(endCursor).toBeDefined();

  if (!firstPage.posts.pageInfo.hasNextPage) {
    return;
  }

  const nextPageQuery = gql`
    query ($after: String) {
      posts(first: 2, after: $after) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

 const secondPage = await client.request<PostsPageResponse>(
  nextPageQuery,
  {
    after: endCursor,
  }
);

  expect(secondPage.posts.edges.length).toBeGreaterThan(0);

  for (const edge of secondPage.posts.edges) {
    expect(edge.node.id).toBeDefined();
    expect(edge.node.name).toBeDefined();
  }
}); 