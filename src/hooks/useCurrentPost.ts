import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const useCurrentPost = (currentId: Id<"posts"> | null) => {
  return useQuery(
    api.posts.getPostById,
    currentId ? { id: currentId } : "skip"
  );
};