import { mutation, query } from "./_generated/server";
import { auth } from "./auth"; // or wherever your auth helper is

export const logVisit = mutation({
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    await ctx.db.insert("visits", {
      userId,
      visitTime: Date.now(),
    });
  },
});

export const getVisits = query({
  handler: async (ctx) => {
    const visits = await ctx.db.query("visits").collect();
    return visits;
  }
})