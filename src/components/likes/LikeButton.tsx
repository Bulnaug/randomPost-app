import { motion } from "framer-motion";
import type { Id } from "../../../convex/_generated/dataModel";
import { HeartIcon } from "./HeartIcon";
import { HeartBurst } from "./HeartBurst";
import { useLike } from "../../hooks/useLike";

type Props = {
  postId: Id<"posts">;
  likes: number;
};

export function LikeButton({ postId, likes }: Props) {
  const { liked, showBurst, toggle } = useLike(postId);

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.95 }}
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
