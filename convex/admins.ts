import { query } from "./_generated/server"

export const getAdmins = query({
  handler: async (ctx) => {
    const admins = await ctx.db.query("admins").collect();
    return admins;
  }
})