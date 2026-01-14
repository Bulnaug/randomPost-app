import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeartIcon } from "./HeartIcon";

const STORAGE_KEY = "global_like";

export function GlobalLikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { liked, count } = JSON.parse(saved);
      setLiked(liked);
      setCount(count);
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
      whileTap={{ scale: 0.9 }}
      className="
        inline-flex items-center gap-2
        px-3 py-1.5
        
        backdrop-blur
      "
    >
      <HeartIcon liked={liked} />

      <motion.span
        key={count}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-sm"
      >
        {count}
      </motion.span>
    </motion.button>
  );
}
