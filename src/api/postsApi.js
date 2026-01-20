import { httpClient } from "./httpClient";

export async function getPosts() {
  const { data } = await httpClient.get("/posts");
  return data;
}

export async function createPost(payload) {
  const { data } = await httpClient.post("/posts", payload);
  return data;
}

export async function updatePost(id, payload) {
  const { data } = await httpClient.patch(`/posts/${id}`, payload);
  return data;
}

export async function deletePost(id) {
  await httpClient.delete(`/posts/${id}`);
  return { id };
}
