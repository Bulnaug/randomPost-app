import { useState, useEffect, useCallback } from "react";
import type { Id } from "../../convex/_generated/dataModel";

export const usePostNavigation = (allPosts: { id: Id<"posts"> }[] | undefined) => {
  const total = allPosts?.length ?? 0;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (total > 0 && index >= total) {
      setIndex(total - 1);
    }
  }, [total, index]);

  const currentId = allPosts && total > 0 ? allPosts[index]?.id ?? null : null;

  const goNext = useCallback(() => {
    setIndex(i => Math.min(total - 1, i + 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setIndex(i => Math.max(0, i - 1));
  }, []);

  return {
    index,
    setIndex,
    total,
    currentId,
    goNext,
    goPrev,
  };
};