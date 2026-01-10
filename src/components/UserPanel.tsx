import { motion } from "framer-motion";
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import type { Id } from "../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type Props = {
  post: {
    _id: Id<"posts">;
    content: string;
  };
};

export function UserPanel({ post }: Props) {

     const [randomKey, setRandomKey] = useState(0);
      const [lastPostId, setLastPostId] = useState<Id<"posts"> | undefined>(
        undefined
      );
      const allPosts = useQuery(api.posts.getAllPostIds);

      const randomPost  = useQuery(api.posts.getRandomPost, {
          randomKey,
          excludePostId: lastPostId,
        });

        

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
      <div className="flex justify-center mb-4 whitespace-pre-line">
        <LikeButton postId={post._id} />
      </div>

       <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              if (post) {
                setLastPostId(post._id);
              }
              setRandomKey(Math.random());
            }}
            className="
              px-5 py-2 
              rounded-full 
              border 
              text-sm 
              text-gray-600
              hover:bg-gray-100
            "
          >
            🔄 Другой пост
          </button>
        </div>

      <Comments postId={post._id} />
    </motion.div>
  );
}
