import { useMemo, useState } from "react";
import {
  useCreatePost,
  useDeletePost,
  usePosts,
  useUpdatePost,
} from "../../hooks/usePosts";
import { getPostsColumns } from "../../table/postsColumns.jsx";
import ConfirmDialog from "../common/ConfirmDialog";
import Modal from "../common/Modal";
import PostForm from "./PostForm";
import PostsTable from "./PostsTable";

export default function PostsPage() {
  // API calls
  const postsQuery = usePosts();
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();

  // UI states
  const [createOpen, setCreateOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Table columns
  const columns = useMemo(
    () =>
      getPostsColumns({
        onEdit: (p) => {
          setFeedback(null);
          setEditPost(p);
        },
        onDelete: (p) => {
          setFeedback(null);
          setDeletePost(p);
        },
      }),
    [],
  );

  const items = postsQuery.data;

  function showSuccess(message) {
    setFeedback({ type: "success", message });
    window.setTimeout(() => setFeedback(null), 2500);
  }

  function showError(message) {
    setFeedback({ type: "error", message });
  }

  async function onCreate(values) {
    setFeedback(null);
    try {
      await createMutation.mutateAsync(values);
      setCreateOpen(false);
      showSuccess("Created successfully");
    } catch {
      showError("Create failed. Please try again.");
    }
  }

  async function onUpdate(values) {
    if (!editPost) return;
    setFeedback(null);
    try {
      await updateMutation.mutateAsync({ id: editPost.id, patch: values });
      setEditPost(null);
      showSuccess("Updated successfully");
    } catch {
      showError("Update failed. Please try again.");
    }
  }

  async function onDelete() {
    if (!deletePost) return;
    setFeedback(null);
    try {
      await deleteMutation.mutateAsync(deletePost.id);
      setDeletePost(null);
      showSuccess("Deleted successfully");
    } catch {
      showError("Delete failed. Please try again.");
    }
  }

  const isLoading = postsQuery?.isLoading;
  const isError = postsQuery?.isError;

  return (
    <div className="page">
      <header className="pageHeader">
        <div>
          <h1 className="title">CRUD Operation</h1>
        </div>
        <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>
          Add Post
        </button>
      </header>

      {feedback ? (
        <div
          className={
            feedback.type === "success"
              ? "alert alertSuccess"
              : "alert alertError"
          }
        >
          {feedback.message}
        </div>
      ) : null}

      {isLoading ? <div className="panel">Loading…</div> : null}

      {isError ? (
        <div className="panel panelError">
          <div>Failed to load posts.</div>
          <button
            className="btn btn-secondary"
            onClick={() => postsQuery.refetch()}
          >
            Retry
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && Array.isArray(items) && items.length === 0 ? (
        <div className="panel">No posts found. Add one to get started.</div>
      ) : null}

      {!isLoading && !isError && Array.isArray(items) && items.length > 0 ? (
        <PostsTable data={items} columns={columns} />
      ) : null}

      {createOpen ? (
        <Modal title="Add Post" onClose={() => setCreateOpen(false)}>
          <PostForm
            onSubmit={onCreate}
            onCancel={() => setCreateOpen(false)}
            busy={createMutation.isPending}
          />
        </Modal>
      ) : null}

      {editPost ? (
        <Modal title="Edit Post" onClose={() => setEditPost(null)}>
          <PostForm
            initialValues={{
              title: editPost.title ?? "",
              author: editPost.author ?? "",
              body: editPost.body ?? "",
            }}
            onSubmit={onUpdate}
            onCancel={() => setEditPost(null)}
            busy={updateMutation.isPending}
          />
        </Modal>
      ) : null}

      {deletePost ? (
        <ConfirmDialog
          title="Delete Post"
          message={`Are you sure you want to delete “${deletePost.title}”? This cannot be undone.`}
          confirmText="Delete"
          onCancel={() => setDeletePost(null)}
          onConfirm={onDelete}
          busy={deleteMutation.isPending}
        />
      ) : null}
    </div>
  );
}
