import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { getLiked, setLiked } from "../utils/likeStorage";

export function useLike(postId: Id<"posts">) {
  const toggleLike = useMutation(api.posts.toggleLike);
  const [liked, setLikedState] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    setLikedState(getLiked(postId));
  }, [postId]);

  const toggle = async () => {
    const next = !liked;
    setLikedState(next);
    setLiked(postId, next);

    if (next) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 500);
    }

    await toggleLike({
      postId,
      delta: next ? 1 : -1,
    });
  };

  return {
    liked,
    showBurst,
    toggle,
  };
}
