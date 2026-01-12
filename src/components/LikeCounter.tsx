import { motion } from "framer-motion";

type Props = {
  likes: number;
  liked: boolean;
  trigger: number;
};

export function LikeCounter({ likes, liked, trigger }: Props) {
  return (
    <motion.span
      key={trigger}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.35, 1] }}
      transition={{ duration: 0.35 }}
      className="text-sm text-gray-700"
    >
      {likes + (liked ? 1 : 0)}
    </motion.span>
  );
}
