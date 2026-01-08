import { MutationCtx, QueryCtx } from "./_generated/server";

type PublicMetadata = {
  role?: "admin" | "user";
};

export async function assertAdmin(
  ctx: MutationCtx | QueryCtx
) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error("Not authenticated");
  }

  const metadata = identity.publicMetadata as PublicMetadata | null;

  if (metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return identity;
}
