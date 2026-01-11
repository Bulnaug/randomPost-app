import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

type Props = {
  postId: Id<"posts">;
  likes: number;
};

export function LikeButton({ postId, likes }: Props) {
  const toggleLike = useMutation(api.posts.toggleLike);

  const storageKey = `liked_${postId}`;
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    setLiked(sessionStorage.getItem(storageKey) === "true");
  }, [postId]);

  const onClick = async () => {
    const nextLiked = !liked;

    setLiked(nextLiked);
    sessionStorage.setItem(storageKey, nextLiked ? "1" : "0");

    if (nextLiked) {
      setBurst(true);
      setTimeout(() => setBurst(false), 600);
    }

    await toggleLike({
      postId,
      delta: nextLiked ? 1 : -1,
    });
  };

  return (
    <div className="absolute bottom-4 left-4">
      {/* 💥 Взрыв */}
      <AnimatePresence>
        {burst &&
          [...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1.2,
                x: Math.random() * 40 - 20,
                y: Math.random() * -40 - 10,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute text-red-400"
            >
              ♥
            </motion.span>
          ))}
      </AnimatePresence>

      {/* ❤️ Кнопка */}
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 1.4 }}
        animate={{ scale: liked ? 1.2 : 1 }}
        className="
          flex items-center gap-1
          text-sm text-gray-600
          select-none
        "
      >
        <motion.span
          animate={{ color: liked ? "#ef4444" : "#9ca3af" }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`
            text-lg
            bg-clip-text
            text-transparent
            ${liked
              ? "bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400"
              : "text-gray-400"}
          `}
        >
          ♥
        </motion.span>

        {/* 🔢 Счётчик */}
        <motion.span
          key={likes}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {likes}
        </motion.span>
      </motion.button>
    </div>
  );
}
