import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

type Props = {
  postId: Id<"posts">;
};

export function LikeButton({ postId }: Props) {
  const likePost = useMutation(api.likes.likePost);

  const likesCount = useQuery(api.likes.countLikes, {
    postId,
  });

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => likePost({ postId })}
        className="px-5 py-2
              rounded-full
              border
              text-sm
              text-gray-600
              hover:bg-gray-100"
      >
        ❤️ Лайк
      </button>

      <span className="text-gray-600 text-sm">
        {likesCount ?? 0} лайков
      </span>
    </div>
  );
}
