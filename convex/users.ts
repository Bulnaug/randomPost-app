import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createAdmin = mutation({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, { email }) => {
    const existing = await db
      .query("users")
      .withIndex("by_email", q => q.eq("email", email))
      .first();

    if (existing) return;

    await db.insert("users", {
      email,
      role: "admin",
    });
  },
});
