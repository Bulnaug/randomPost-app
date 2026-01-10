import { motion } from "framer-motion";

type Props = {
  text: string;
};

export function AnimatedPostText({ text }: Props) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.12,
            ease: "easeOut",
          }}
          className="
            font-serif
            text-lg
            leading-relaxed
            text-gray-900
          "
        >
          {line || "\u00A0"}
        </motion.p>
      ))}
    </div>
  );
}
