import { ConvexError } from "convex/values";
import { QueryCtx, MutationCtx } from "./_generated/server";

type Ctx = QueryCtx | MutationCtx;

type PublicMetadata = {
  role?: "admin" | "user";
};

export async function assertAdmin(ctx: Ctx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const publicMetadata = identity.publicMetadata as PublicMetadata | undefined;

  if (publicMetadata?.role !== "admin") {
    throw new ConvexError("Not an admin");
  }
}
