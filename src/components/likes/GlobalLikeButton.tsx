import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeartIcon } from "./HeartIcon";

const STORAGE_KEY = "global_like";

export function GlobalLikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setLiked(data.liked);
      setCount(data.count);
    }
  }, []);

  const onClick = () => {
    if (liked) return;

    const next = count + 1;
    setLiked(true);
    setCount(next);

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ liked: true, count: next })
    );
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      className="
        flex items-center gap-1.5
        px-2.5 py-1
        rounded-full
        hover:bg-black/5 dark:hover:bg-white/10
        transition
      "
    >
      <HeartIcon liked={liked} />

      <motion.span
        key={count}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xs tabular-nums"
      >
        {count}
      </motion.span>
    </motion.button>
  );
}