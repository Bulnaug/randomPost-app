const key = (postId: string) => `liked_${postId}`;

export function getLiked(postId: string) {
  return sessionStorage.getItem(key(postId)) === "1";
}

export function setLiked(postId: string, value: boolean) {
  sessionStorage.setItem(key(postId), value ? "1" : "0");
}
