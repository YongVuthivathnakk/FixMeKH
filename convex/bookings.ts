import { v } from "convex/values";
import { query } from "./_generated/server";

// convex/bookings.ts
export const getBookingByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .collect();

    // Join with technicians data
    return Promise.all(bookings.map(async booking => {
      const technician = await ctx.db.get(booking.technicianId);
      return {
        ...booking,
        technicianName: technician?.userName,
      };
    }));
  },
});