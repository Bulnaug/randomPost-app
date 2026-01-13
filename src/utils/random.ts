export const getRandomIndex = (currentIndex: number, total: number): number => {
  if (total <= 1) return 0;
  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * total);
  }
  return next;
};