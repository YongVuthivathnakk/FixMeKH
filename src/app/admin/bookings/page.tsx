"use client";

import { useAllBookings } from "@/app/features/admin/api/use-all-bookings";
import { Loader } from "lucide-react";
import React from "react";
import { DataTable } from "../component/table/data-table";
import { BookingColumns } from "../component/table/columns";

function BookingDashboard() {
  const { bookings, isBookingLoading } = useAllBookings();

  if (isBookingLoading) {
    return (
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <p className="text-lg font-bold">Loading</p>
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
        <div className="container mx-auto py-4">
          <DataTable columns={BookingColumns} showCreateButton={false} data={bookings} />
        </div>
  )
}

export default BookingDashboard;
