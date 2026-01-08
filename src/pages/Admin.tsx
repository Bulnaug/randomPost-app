import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export function Admin() {
  const adminKey = import.meta.env.VITE_ADMIN_KEY;

  const posts = useQuery(api.posts.getAllPosts);
  const createPost = useMutation(api.posts.createPostAdmin);
  const updatePost = useMutation(api.posts.updatePost);
  const deleteComment = useMutation(api.comments.deleteCommentAdmin);
  const deletePost = useMutation(api.posts.deletePost);

  const [newPost, setNewPost] = useState("");
  const [editingPostId, setEditingPostId] =
    useState<Id<"posts"> | null>(null);
  const [editText, setEditText] = useState< string >("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Админка</h1>

        {/* Создание поста */}
        <div className="mb-6">
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Новый пост..."
            className="w-full border rounded p-2"
          />
          <button
            onClick={() => {
              if (!newPost.trim()) return;
              createPost({ content: newPost, adminKey });
              setNewPost("");
            }}
            className="mt-2 px-4 py-2 bg-black text-white rounded"
          >
            ➕ Добавить пост
          </button>
        </div>

        {/* Список постов */}
        <div className="space-y-6">
          {posts?.map(post => (
            <div
              key={post._id}
              className="border rounded-lg p-4"
            >
              {editingPostId === post._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                  <button
                    onClick={() => {
                      updatePost({
                        postId: post._id,
                        content: editText,
                        adminKey,
                      });
                      setEditingPostId(null);
                    }}
                    className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Сохранить
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-2">{post.content}</p>
                  <button
                    onClick={() => {
                      setEditingPostId(post._id);
                      setEditText(post.content);
                    }}
                    className="px-3 py-1 border rounded"
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={async () => {
                        if (!confirm("Удалить пост навсегда?")) return;

                        await deletePost({
                        postId: post._id,
                        adminKey,
                        });
                    }}
                    className="text-red-600 hover:underline"
                    >
                    Удалить
                  </button>
                </>
              )}

              {/* Комментарии поста */}
              <PostComments
                postId={post._id}
                adminKey={adminKey}
                onDelete={deleteComment}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* === Комментарии поста === */

function PostComments({
  postId,
  adminKey,
  onDelete,
}: {
  postId: Id<"posts">;
  adminKey: string;
  onDelete: any;
}) {
  const comments = useQuery(api.comments.getCommentsByPost, {
    postId,
  });

  if (!comments?.length) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="font-semibold text-sm">Комментарии</h3>
      {comments.map(c => (
        <div
          key={c._id}
          className="flex justify-between items-center text-sm bg-gray-100 rounded px-2 py-1"
        >
          <span>{c.text}</span>
          <button
            onClick={() =>
              onDelete({
                commentId: c._id,
                adminKey,
              })
            }
            className="text-red-600"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
