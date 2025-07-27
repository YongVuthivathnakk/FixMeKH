import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin, Loader2 } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { useCurrentUsers } from "@/app/features/auth/api/use-current-user";

export const BookingList = () => {
  const { data: user, isLoading } = useCurrentUsers();

  const bookings = useQuery(
    api.bookings.getBookingByUserId,
    user ? { userId: user._id } : "skip"
  );

  // still loading user
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // user not found
  if (!user) {
    return null;
  }

  // bookings is still loading
  if (bookings === undefined) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // no bookings
  if (bookings.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Calendar className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium">No bookings found</h3>
        <p className="text-muted-foreground mt-1">
          You haven't made any bookings yet
        </p>
      </div>
    );
  }

  // bookings available
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking._id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="capitalize">{booking.serviceType}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4" />
                  {booking.technicianName}
                </CardDescription>
              </div>
              <Badge
                variant={
                  booking.status === "completed"
                    ? "default"
                    : booking.status === "cancelled"
                    ? "destructive"
                    : "secondary"
                }
                className="capitalize"
              >
                {booking.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p>{new Date(booking.serviceDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Time Slot</p>
                  <p>{booking.timeSlot}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p>{booking.address}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-medium">${booking.price.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
