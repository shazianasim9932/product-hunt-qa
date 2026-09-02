import { test, expect } from "bun:test";
import { gql } from "graphql-request";
import dotenv from "dotenv";
import { createProductHuntClient } from "./client/productHuntClient";
import type { PostsResponse } from "./types/productHunt";

dotenv.config();

test("should fetch Product Hunt posts", async () => {
  const client = createProductHuntClient();

  const query = gql`
    query {
      posts(first: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  // const response = await client.request(query);
  const response = await client.request<PostsResponse>(query);

  expect(response.posts.edges.length).toBeGreaterThan(0);
  expect(response.posts.edges.length).toBeLessThanOrEqual(5);

  for (const edge of response.posts.edges) {
    expect(edge.node.id).toBeDefined();
    expect(edge.node.name).toBeDefined();
    expect(edge.node.name.length).toBeGreaterThan(0);
  }
});

// import { test, expect } from "bun:test";
// import dotenv from "dotenv";
// import { GraphQLClient, gql } from 'graphql-request';

// const client = new GraphQLClient(
//   'https://api.producthunt.com/v2/api/graphql',
//   {
//     headers: {
//       Authorization: `Bearer ${ process.env.PRODUCT_HUNT_TOKEN}`,
//     },
//   }
// );

// test("should fetch current user details", async () => {
//     const response = await client.request(gql`query {
//         posts(first:10) {
//             edges {
//                 node {
//                     id
//                     name
//                     description
//                     productLinks {
//                     url
//                     }
//                     tagline
//                     votesCount
//                     commentsCount
//                     website
//                 }
//             }
//         }
//     }`);
//     console.log(response);
// });

// test("returning largest argument", async()=>{
//     const arg = await client(g)
// })

// // test("should fetch current user details", async () => {
// //   const query = `
// //     query {
// //       viewer {
// //         name
// //         username
// //       }
// //     }
// //   `;
// //  console.log(
// //   "Token loaded:",
// //   Boolean(process.env.PRODUCT_HUNT_TOKEN),
// // );
// //   const response = await fetch(API_URL, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${process.env.PRODUCT_HUNT_TOKEN}`,
// //     },
// //     body: JSON.stringify({ query }),
// //   });

// //   expect(response.status).toBe(200);

// //   const body = await response.json();

// // console.log(JSON.stringify(body, null, 2));

// // expect(body.data.viewer.name).toBeDefined();
// // expect(body.data.viewer.username).toBeDefined();
// // });