import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  index: number;
  total: number;
  onRandom: () => void;
};

export function PostNavigator({ onNext, onPrev, onRandom, index, total }: Props) {

  return (
    <div className="mt-6 flex justify-between items-center gap-4">
            <button
              disabled={index === 0}
              onClick={onPrev}
              className="
                group
                px-5 py-3
                rounded-xl
                bg-white/70 dark:bg-zinc-900/80
                backdrop-blur-md
                border border-gray-300/30 dark:border-gray-700/30
                text-gray-800 dark:text-zinc-200
                hover:bg-white/90 dark:hover:bg-gray-900/90
                
                active:scale-95
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:bg-white/70 disabled:dark:hover:bg-gray-900/70
                flex items-center gap-2
                font-medium
              "
            >
              <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-zinc-100 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="hidden sm:inline">Предыдущий</span>
            </button>

            <button
              onClick={onRandom}
               className="
               hidden
               sm:block
                group
                px-5 py-3
                rounded-xl
                bg-white/70 dark:bg-zinc-900/80
                backdrop-blur-md
                border border-gray-300/30 dark:border-gray-700/30
                text-gray-800 dark:text-zinc-200
                hover:bg-white/90 dark:hover:bg-gray-900/90
                
                active:scale-95
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:bg-white/70 disabled:dark:hover:bg-gray-900/70
                flex items-center gap-2
                font-medium
              "
            >
                🎲 Случайный
            </button>

            <button
              disabled={index === total - 1}
              onClick={onNext}
              className="
                group
                px-5 py-3
                rounded-xl
                bg-white/70 dark:bg-zinc-900/80
                backdrop-blur-md
                border border-gray-300/30 dark:border-gray-700/30
                text-gray-800 dark:text-zinc-200
                hover:bg-white/90 dark:hover:bg-gray-900/90
                
                active:scale-95
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:bg-white/70 disabled:dark:hover:bg-gray-900/70
                flex items-center gap-2
                font-medium
              "
            >
              <span className="hidden sm:inline">Следующий</span>
              <ArrowRight className="w-4 h-4 text-gray-500 dark:text-zinc-100 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
  );
}
