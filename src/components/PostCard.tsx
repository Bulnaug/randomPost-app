import { motion } from "framer-motion";
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import type { Id } from "../../convex/_generated/dataModel";

type Props = {
  post: {
    _id: Id<"posts">;
    content: string;
  };
};

export function PostCard({ post }: Props) {
  return (
    <motion.div
      key={post._id}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        bg-white 
        rounded-2xl 
        shadow-lg 
        px-8 py-10 
        max-w-2xl 
        w-full
      " 
    >
      <p className="text-xl md:text-2xl leading-relaxed whitespace-pre-line">
        {post.content.split("\n").map((line, i) => (
          <span
            key={i}
            className={line.trim().startsWith("—") ? "block ml-4 text-gray-700" : "block"}
          >
            {line}
          </span>
        ))}
      </p>

      {/* <div className="flex justify-center mb-4 whitespace-pre-line">
        <LikeButton postId={post._id} />
      </div>

      <Comments postId={post._id} /> */}
    </motion.div>
  );
}
