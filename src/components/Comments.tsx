import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { type KeyboardEvent } from 'react'

type Props = {
  postId: Id<"posts">;
};

export function Comments({ postId }: Props) {
  const [text, setText] = useState("");

  const comments = useQuery(api.comments.getComments, {
    postId,
  });

  const addComment = useMutation(api.comments.addComment);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim()) {
      addComment({ postId, text });
      setText(""); // Очищаем поле
    }
  }

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2 dark:text-zinc-200">Комментарии</h2>

      <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
        {comments?.length ? (
          comments.map(comment => (
            <div
              key={comment._id}
              className="text-sm rounded-lg px-3 py-2 dark:text-zinc-200"
            >
              {comment.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 dark:text-zinc-200">
            Пока нет комментариев
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Написать комментарий..."
          className="
            w-full
            rounded-xl
            dark:bg-zinc-800
            dark:text-zinc-100
            placeholder:text-zinc-500
            border border-white/5
            px-4 py-2
            focus:outline-none
            focus:ring-2 dark:focus:ring-blue-500/40
            focus:ring-white/10
          "
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            addComment({ postId, text });
            setText("");
          }}
          className="px-4 py-2 bg-black text-white rounded-xl dark:bg-zinc-900/80"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
