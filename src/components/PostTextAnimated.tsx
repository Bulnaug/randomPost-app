import { motion, AnimatePresence } from "framer-motion";
import { TypingPostText } from "./TypingPostText";
import type { Id } from "../../convex/_generated/dataModel";

type Props = {
  post: {
    _id: Id<"posts">;
    content: string;
  };
};

export function PostTextAnimated({ post }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={post._id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <TypingPostText text={post.content} key={post._id} />
      </motion.div>
    </AnimatePresence>
  );
}
