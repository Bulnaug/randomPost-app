import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  text: string;
  sound?: boolean;
};

export function TypingPostText({ text, sound = true }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      const char = text[i];
      setDisplayed(prev => prev + char);

      i++;

      if (i < text.length) {
        let delay = 15;

        if (",;".includes(char)) delay = 50;
        if (".!?…".includes(char)) delay = 100;
        if (char === "\n") delay = 300;

        timeout = setTimeout(typeNext, delay);
      }
    };

    setDisplayed("");
    typeNext();

    return () => clearTimeout(timeout);
  }, [text, sound]);

  // мигание курсора
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible(v => !v);
    }, 300);

    return () => clearInterval(blink);
  }, []);

  return (
    <div className="font-serif text-xl leading-loose text-gray-900 whitespace-pre-wrap">
      {displayed}
      <AnimatePresence>
        {cursorVisible && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block ml-0.5"
          >
            ▍
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
