import { query } from "./_generated/server";
import { v } from "convex/values";

/* === PUBLIC === */

export const getRandomPost = query({
  args: {
    randomKey: v.number(),
    excludePostId: v.optional(v.id("posts")),
  },
  handler: async ({ db }, { excludePostId }) => {
    let posts = await db.query("posts").collect();

    if (excludePostId) {
      posts = posts.filter(post => post._id !== excludePostId);
    }

    if (posts.length === 0) {
      posts = await db.query("posts").collect();
    }

    if (posts.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  },
});


export const getAllPostIds = query({
  handler: async ({ db }) => {
    const posts = await db.query("posts").collect();
    return posts.map((p, index) => ({
      id: p._id,
      index,
    }));
  },
});