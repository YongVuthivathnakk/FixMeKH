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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const BookingList = ({
  isMyBookingsOpen,
  setIsMyBookingsOpen,
}: {
  isMyBookingsOpen: boolean;
  setIsMyBookingsOpen: (open: boolean) => void;
}) => {
  const { data: user, isLoading } = useCurrentUsers();

  const bookings = useQuery(
    api.bookings.getBookingByUserId,
    user ? { userId: user._id } : "skip"
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  if (bookings === undefined) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
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
  if (bookings.length === 0) {
    return (
      <section className="text-center py-16">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No bookings found</h3>
        <p className="text-muted-foreground mt-1">
          You haven't made any bookings yet.
        </p>
      </section>
    );
  }

  const randomPrice = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

  return (
    <section className="space-y-6">
      <Dialog open={isMyBookingsOpen} onOpenChange={setIsMyBookingsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Calendar className="h-5 w-5 text-primary" />
              Book Service
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Schedule your appointment with our verified providers.
            </DialogDescription>
          </DialogHeader>

          {bookings.map((booking) => {
            const randomPrice = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

            return (
              // <-- You need this return
              <Card
                key={booking._id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-2 border-b border-muted/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="capitalize text-lg">
                        {booking.serviceType}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1 text-sm text-muted-foreground max-w-xs truncate">
                        <User className="h-4 w-4" />
                        <span title={booking.technicianName}>
                          {booking.technicianName || "Technician"}
                        </span>
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
                      className="capitalize text-sm"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Date</p>
                        <p>
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Time Slot
                        </p>
                        <p>{booking.timeSlot}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Address</p>
                        <p
                          className="truncate max-w-[300px]"
                          title={booking.address}
                        >
                          {booking.address}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Price</p>
                      <p className="font-semibold text-emerald-600">${randomPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </DialogContent>
      </Dialog>
    </section>
  );
};
