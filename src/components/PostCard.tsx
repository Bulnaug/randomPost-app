import type { Id } from "../../convex/_generated/dataModel";
import { TypingPostText } from "./TypingPostText";

type Props = {
  post: {
    _id: Id<"posts">;
    content: string;
  };
};

export function PostCard({ post }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm max-w-prose mx-auto">
      <TypingPostText text={post.content} sound/>
    </div>
  );
}
