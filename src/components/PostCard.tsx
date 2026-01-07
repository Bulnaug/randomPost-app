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
    >
      <p className="text-gray-800 text-center text-lg mb-6">
        {post.content}
      </p>

      <div className="flex justify-center mb-4">
        <LikeButton postId={post._id} />
      </div>

      <Comments postId={post._id} />
    </motion.div>
  );
}
