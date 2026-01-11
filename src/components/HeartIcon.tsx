import { motion } from "framer-motion";

type Props = {
  liked: boolean;
};

export function HeartIcon({ liked }: Props) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className="block"
      animate={{ scale: liked ? 1.15 : 1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.path
        d="M12 21s-6.716-4.936-9.428-8.364C.91 10.35 1.253 7.108 3.343 5.515 5.302 4.05 7.846 4.36 9.514 5.995L12 8.43l2.486-2.435c1.668-1.635 4.212-1.945 6.171-.48 2.09 1.593 2.433 4.835.771 7.121C18.716 16.064 12 21 12 21z"
        fill={liked ? "url(#heartGradient)" : "#d1d5db"}
      />

      {liked && (
        <defs>
          <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      )}
    </motion.svg>
  );
}
