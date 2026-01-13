// hooks/usePostNavigation.ts
import { useState, useEffect, useCallback } from "react";
import type { Id } from "../../convex/_generated/dataModel";

export const usePostNavigation = (allPosts: { id: Id<"posts"> }[] | undefined) => {
  const total = allPosts?.length ?? 0;
  const [index, setIndex] = useState(0);

  // Корректируем индекс если постов стало меньше
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

  const goRandom = useCallback(() => {
    if (!total) return;
    let next = index;
    while (next === index && total > 1) {
      next = Math.floor(Math.random() * total);
    }
    setIndex(next);
  }, [index, total]);

  return {
    index,
    setIndex,
    total,
    currentId,
    goNext,
    goPrev,
    goRandom
  };
};