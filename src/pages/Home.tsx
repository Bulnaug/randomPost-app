import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Home() {
  const [randomKey, setRandomKey] = useState(0);
  const [commentText, setCommentText] = useState("");

  const post = useQuery(api.posts.getRandomPost, { randomKey });

  const likePost = useMutation(api.likes.likePost);
  const addComment = useMutation(api.comments.addComment);

  const likesCount = useQuery(
    api.likes.countLikes,
    post ? { postId: post._id } : "skip"
  );

  const comments = useQuery(
    api.comments.getComments,
    post ? { postId: post._id } : "skip"
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Random Post
        </h1>

        {post ? (
          <>
            <p className="text-gray-800 text-center text-lg mb-6">
              {post.content}
            </p>

            {/* Лайки */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <button
                onClick={() => likePost({ postId: post._id })}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                ❤️ Лайк
              </button>
              <span className="text-gray-600">
                {likesCount ?? 0} лайков
              </span>
            </div>

            {/* Комментарии */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Комментарии</h2>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments?.length ? (
                  comments.map(comment => (
                    <div
                      key={comment._id}
                      className="text-sm bg-gray-100 rounded-lg px-3 py-2"
                    >
                      {comment.text}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    Пока нет комментариев
                  </p>
                )}
              </div>
            </div>

            {/* Добавить комментарий */}
            <div className="flex gap-2">
              <input
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Написать комментарий..."
                className="flex-1 border rounded-xl px-3 py-2 text-sm"
              />
              <button
                onClick={() => {
                  if (!commentText.trim()) return;
                  addComment({
                    postId: post._id,
                    text: commentText,
                  });
                  setCommentText("");
                }}
                className="px-4 py-2 bg-black text-white rounded-xl"
              >
                ➤
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center">
            Постов пока нет
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setRandomKey(Math.random())}
            className="px-4 py-2 border rounded-xl"
          >
            🔄 Другой пост
          </button>
        </div>
      </div>
    </div>
  );
}