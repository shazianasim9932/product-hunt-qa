export interface Post {
  id: string;
  name: string;
}

export interface PostEdge {
  node: Post;
}

export interface PostsResponse {
  posts: {
    edges: PostEdge[];
  };
}

export interface PaginationResponse {
  posts: {
    edges: {
      cursor: string;
      node: Post;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface NextPageResponse {
  posts: {
    edges: {
      node: Post;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface PostsPageResponse {
  posts: {
    edges: {
      node: Post;
    }[];
  };
}