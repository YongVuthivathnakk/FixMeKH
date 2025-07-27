import { query } from "./_generated/server";

const getAllSessions = query({
  handler: async (ctx) => {
    const sessions = await ctx.db.query("authSessions").collect();
    return sessions;
  }
})