export async function assertAdmin(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error("Not authenticated");
  }

  const role = (identity.publicMetadata as { role?: string })?.role;

  if (role !== "admin") {
    throw new Error("Not an admin");
  }
}
