import { GlobalLikeButton } from "../likes/GlobalLikeButton";

export function Footer() {
  return (
    <footer
      className="
        absolute bottom-0 left-0 right-0
        z-40
        border-t border-black/5 dark:border-white/5
        bg-white dark:bg-zinc-900/80
        backdrop-blur
      "
    >
      <div
        className="
          max-w-2xl mx-auto
          h-10
          flex items-center justify-center
          gap-3
          text-sm
          text-gray-900 dark:text-zinc-100
        "
      >
        <span>Спасибо "K1B"</span>
        <GlobalLikeButton />
        <span>за идею</span>
      </div>
    </footer>
  );
}