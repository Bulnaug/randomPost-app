import type { Id } from "../../convex/_generated/dataModel";
import { TypingPostText } from "./TypingPostText";
import { LikeButton } from "./LikeButton";

type Props = {
  index:number;
  total:number;
};

export function PostCounter({ index, total }: Props) {

  return (
            <div className="
              mb-4
              text-xs
              font-medium
              text-zinc-400
              text-center
              tracking-widest
              opacity-80
            "
          >
            {index + 1} / {total}
          </div>
  );
}
