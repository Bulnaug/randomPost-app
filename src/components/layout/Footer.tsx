import { GlobalLikeButton } from "../likes/GlobalLikeButton";

export function Footer() {
  return (
    <footer
      className="
        flex flex-col items-center gap-3
        text-md
        text-zinc-500 dark:text-zinc-100
        select-none
        dark:bg-zinc-900/80
      "
    >
      <p className="text-center leading-relaxed">
        Спасибо <GlobalLikeButton /> K1B за идею 
      </p>

      
    </footer>
  );
}
