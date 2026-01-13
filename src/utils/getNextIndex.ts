// src/features/posts/utils/getNextIndex.ts
export function getNextIndex(
  current: number,
  total: number,
  direction: "next" | "prev"
) {
  if (total === 0) return 0;

  if (direction === "next") {
    return (current + 1) % total;
  }

  return (current - 1 + total) % total;
}
