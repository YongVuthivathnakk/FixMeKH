import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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


export const createBooking = mutation({
  args: {
    userId: v.id("users"),
    technicianId: v.id("technicians"),
    userEmail: v.string(),
    serviceType: v.union(
      v.literal("plumber"),
      v.literal("cleaner"),
      v.literal("electrician"),
      v.literal("appliance repair")
    ),
    description: v.string(),
    address: v.string(),
    bookingDate: v.number(), // timestamp (e.g., Date.now())
    timeSlot: v.union(
      v.literal("Morning (9AM - 12PM)"),
      v.literal("Afternoon (12PM - 5PM)"),
      v.literal("Evening (5PM - 8PM)")
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("rescheduled")
    ),
  },

  handler: async (ctx, args) => {
    const bookingId = await ctx.db.insert("bookings", {
      userId: args.userId,
      userEmail: args.userEmail,
      technicianId: args.technicianId,
      serviceType: args.serviceType,
      description: args.description,
      address: args.address,
      bookingDate: args.bookingDate,
      timeSlot: args.timeSlot,
      status: args.status,
    });

    return bookingId;
  },
});


export const getAllBookings = query(async ({ db }) => {
  const bookings = await db.query("bookings").collect();
  return bookings;
})

