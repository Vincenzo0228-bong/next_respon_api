import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Posts', 'Post', 'Comments'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, { page: number; title?: string }>({
      async queryFn({ page, title }, _queryApi, _extraOptions, fetchWithBQ) {
        const params: Record<string, string> = {
          _page: page.toString(),
          _limit: '10',
        };
        
        if (title && title.trim()) {
          params.title_like = title.trim();
        }
        
        const queryString = new URLSearchParams(params).toString();
        const postsResponse = await fetchWithBQ(`/posts?${queryString}`);
        
        if (postsResponse.error) {
          return { error: postsResponse.error };
        }
        
        const posts = postsResponse.data as Post[];
        
        // To get total count, fetch all posts (or search results) without pagination
        const countParams: Record<string, string> = {};
        if (title && title.trim()) {
          countParams.title_like = title.trim();
        }
        const countQueryString = new URLSearchParams(countParams).toString();
        const countResponse = await fetchWithBQ(`/posts${countQueryString ? `?${countQueryString}` : ''}`);
        
        let totalCount = 100; // Default
        if (countResponse.data) {
          totalCount = (countResponse.data as Post[]).length;
        }
        
        return {
          data: {
            posts,
            totalCount,
          },
        };
      },
      providesTags: ['Posts'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    getComments: builder.query<Comment[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: 'Comments', id: postId },
      ],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useGetCommentsQuery } = api;

