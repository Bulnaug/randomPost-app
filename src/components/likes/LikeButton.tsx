import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { HeartIcon } from "./HeartIcon";
import { HeartBurst } from "./HeartBurst";

type Props = {
  postId: Id<"posts">;
  likes: number;
};

export function LikeButton({ postId, likes }: Props) {
  const toggleLike = useMutation(api.posts.toggleLike);
  const storageKey = `liked_${postId}`;
  const [liked, setLiked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    setLiked(sessionStorage.getItem(storageKey) === "1");
  }, [postId]);

  const onClick = async () => {
    const next = !liked;
    setLiked(next);
    sessionStorage.setItem(storageKey, next ? "1" : "0");

    if (next) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 500);
    }

    await toggleLike({
      postId,
      delta: next ? 1 : -1,
    });
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      // className="relative flex items-center gap-2 text-sm text-gray-600"
      className="
        flex items-center gap-2
        px-2.5 py-1
        rounded-full
        dark:bg-black/30
        backdrop-blur
      "
    >
      <div className="relative">
        <HeartIcon liked={liked} />
        {showBurst && <HeartBurst />}
      </div>

      <motion.span
        key={likes + (liked ? 1 : 0)}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="
          text-sm
          dark:text-zinc-400
        "
      >
        {likes}
      </motion.span>
    </motion.button>
  );
}
