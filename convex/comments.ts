import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const ADMIN_KEY = process.env.ADMIN_KEY;

function assertAdmin(adminKey?: string) {
  if (!adminKey || adminKey !== ADMIN_KEY) {
    throw new Error("Unauthorized");
  }
}

export const getCommentsByPost = query({
  args: { postId: v.id("posts") },
  handler: async ({ db }, { postId }) => {
    return await db
      .query("comments")
      .filter(q => q.eq(q.field("postId"), postId))
      .order("desc")
      .collect();
  },
});

export const deleteCommentAdmin = mutation({
  args: {
    commentId: v.id("comments"),
    adminKey: v.string(),
  },
  handler: async ({ db }, { commentId, adminKey }) => {
    assertAdmin(adminKey);
    await db.delete(commentId);
  },
});

export const getComments = query({
  args: { postId: v.id("posts") },
  handler: async ({ db }, { postId }) => {
    return await db
      .query("comments")
      .filter(q => q.eq(q.field("postId"), postId))
      .order("asc")
      .collect();
  },
});

export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    text: v.string(),
  },
  handler: async ({ db }, { postId, text }) => {
    await db.insert("comments", {
      postId,
      text,
      createdAt: Date.now(),
    });
  },
});