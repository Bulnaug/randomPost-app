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
      <h2 className="font-semibold mb-2">Комментарии</h2>

      <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
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

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Написать комментарий..."
          className="flex-1 border rounded-xl px-3 py-2 text-sm"
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            addComment({ postId, text });
            setText("");
          }}
          className="px-4 py-2 bg-black text-white rounded-xl"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
