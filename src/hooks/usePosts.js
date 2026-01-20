import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPosts, updatePost } from "../api/postsApi";

const postsKey = ["posts"];

export function usePosts() {
  return useQuery({
    queryKey: postsKey,
    queryFn: getPosts,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postsKey });
      const previousPosts = queryClient.getQueryData(postsKey);

      const optimisticPost = {
        id: `tmp-${Date.now()}`,
        ...newPost,
      };

      queryClient.setQueryData(postsKey, (old) => {
        const safe = Array.isArray(old) ? old : [];
        return [optimisticPost, ...safe];
      });

      return { previousPosts };
    },
    onError: (_err, _newPost, ctx) => {
      if (ctx?.previousPosts)
        queryClient.setQueryData(postsKey, ctx.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postsKey });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }) => updatePost(id, patch),
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: postsKey });
      const previousPosts = queryClient.getQueryData(postsKey);

      queryClient.setQueryData(postsKey, (old) => {
        const safe = Array.isArray(old) ? old : [];
        return safe.map((p) => (p.id === id ? { ...p, ...patch } : p));
      });

      return { previousPosts };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousPosts)
        queryClient.setQueryData(postsKey, ctx.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postsKey });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postsKey });
      const previousPosts = queryClient.getQueryData(postsKey);

      queryClient.setQueryData(postsKey, (old) => {
        const safe = Array.isArray(old) ? old : [];
        return safe.filter((p) => p.id !== id);
      });

      return { previousPosts };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previousPosts)
        queryClient.setQueryData(postsKey, ctx.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postsKey });
    },
  });
}
