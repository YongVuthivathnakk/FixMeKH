"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@/app/features/auth/component/user-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../../components/ui/badge";

import {
  Phone,
  Users,
  Star,
  Clock,
  MapPin,
  Wrench,
  Zap,
  Sparkles,
  Settings,
  Shield,
  Calendar,
  CheckCircle,
  Eye,
  FileText,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
// Import your image here
import homeMain from "./asset/homemain.png";
import { useGetTechnicians } from "@/app/features/technician/api/use-get-technicians";
import { Skill } from "@/app/features/types";
import { BookingList } from "./booking-list-modal";
import FeatureSection from "./feature-section";
import { useCurrentUsers } from "@/app/features/auth/api/use-current-user";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";

/**
 * Home Page Components for FixMeKH - Home Service Booking Platform
 * Built with Tailwind CSS and TypeScript (.tsx)
 * Features: Responsive design, service categories, platform features, and booking interface
 */

const SERVICE_CARD = [
  {
    id: 1,
    service: "PLumbing Services",
    isAvialable: true,
    description:
      "Pipe repairs, leak fixes, drain cleaning, faucet installation, and emergency plumbing services.",
    icon: Wrench,
    skill: "plumber" as Skill,
  },
  {
    id: 2,
    service: "Electrical Work",
    isAvialable: true,
    description:
      "Wiring installation, outlet repairs, lighting fixtures, electrical panel upgrades, and safety inspections.",
    icon: Zap,
    skill: "electrician" as Skill,
  },
  {
    id: 3,
    service: "Cleaning Service",
    isAvialable: true,
    description:
      "Deep cleaning, regular housekeeping, carpet cleaning, window washing, and post-construction cleanup.",
    icon: Sparkles,
    skill: "cleaner" as Skill,
  },
  {
    id: 4,
    service: "Appliance Repair",
    isAvialable: true,
    description:
      "Deep cleaning, regular housekeeping, carpet cleaning, window washing, and post-construction cleanup.",
    icon: Settings,
    skill: "appliance repair" as Skill,
  },
];

export const HomeHeader = ({
  onOpenMyBookings,
}: {
  onOpenMyBookings: () => void;
}) => {
  return (
    <>
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-16 justify-between px-4 w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">FixMeKH</h1>
            <p className="text-sm text-muted-foreground">
              Home Service Booking Platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMyBookings}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              My Bookings
            </Button>
            <UserButton />
          </div>
        </div>
      </header>
    </>
  );
};

export const HomeMain = ({
  isMyBookingsOpen,
  setIsMyBookingsOpen,
}: {
  isMyBookingsOpen: boolean;
  setIsMyBookingsOpen: (open: boolean) => void;
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingDetailOpen, setIsBookingDetailOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectTechnician, setSelectTechnician] = useState("");
  const [skill, setSkill] = useState<Skill>("plumber");

  const { data, isLoading } = useCurrentUsers();
      const { technicians, isTechnicianLoading } = useGetTechnicians(skill);

      // Form data states
      const [bookingForm, setBookingForm] = useState({
        date: "",
        time: "Morning (9AM - 12PM)",
        description: "",
        address: "",
        selectedProvider: "",
        status: "pending",
      });


  const createBooking = useMutation(api.bookings.createBooking);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background text-muted-foreground flex-col space-y-4">
        <div className="animate-pulse text-xl font-medium">
          Welcome! Getting things ready for you...
        </div>
        {/* <div className="h-2 w-48 bg-muted rounded animate-pulse" /> */}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { _id } = data;

  const handleServiceBooking = (serviceName: Skill) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
    setSkill(serviceName);

    // Reset form when opening new booking
    setBookingForm({
      date: "",
      time: "Morning (9AM - 12PM)",
      description: "",
      address: "",
      status: "pending",
      selectedProvider: "",
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookingForm.date || !bookingForm.description || !bookingForm.address || !bookingForm.selectedProvider) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const timestamp = new Date(bookingForm.date).getTime();
      const userId = _id;

      await createBooking({
        userId: userId as Id<"users">,
        technicianId: bookingForm.selectedProvider as Id<"technicians">,
        serviceType: selectedService as any,
        description: bookingForm.description,
        address: bookingForm.address,
        bookingDate: timestamp,
        timeSlot: bookingForm.time as any,
        status: bookingForm.status as any,
      });

      toast.success(
        `Booking confirmed for ${selectedService} on ${bookingForm.date} at ${bookingForm.time}!`
      );

      setIsBookingModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleViewBookingDetail = (booking: any) => {
    setIsBookingDetailOpen(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        {/* Welcome Text Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Book Home Services with Confidence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse service categories, schedule appointments, and connect with
            verified service providers. Digitizing the home service booking
            process for improved convenience, efficiency, and trust.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Home Service Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_CARD.map((card) => (
            <Card
              key={card.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group border-2 hover:border-primary/20"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <card.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <CardTitle>{card.service}</CardTitle>
                  </div>
                  {card.isAvialable ? (
                    <Badge variant="secondary">Available</Badge>
                  ) : (
                    <Badge variant="outline">Unavailable</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="mb-4">
                  {card.description}
                </CardDescription>
                <Button
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => handleServiceBooking(card.skill)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FeatureSection />

      {/* Service Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleBookingSubmit}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book {selectedService}
              </DialogTitle>
              <DialogDescription>
                Schedule your {selectedService?.toLowerCase()} appointment with
                our verified providers.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Service Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Information</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      <strong>Service:</strong> {selectedService}
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Response Time:</strong> Within 24 hours
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Price Range:</strong> $50 - $200 (varies by
                      service)
                    </p>
                  </div>
                </div>

                {/* Quick Booking Form */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Quick Booking</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium" htmlFor="date">
                        Preferred Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="w-full mt-1 p-2 border rounded-md"
                        min={new Date().toISOString().split("T")[0]}
                        value={bookingForm.date}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="time-option"
                      >
                        Preferred Time
                      </label>
                      <select
                        className="w-full mt-1 p-2 border rounded-md"
                        id="time-option"
                        value={bookingForm.time}
                        required
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            time: e.target.value,
                          }))
                        }
                      >
                        <option>Morning (9AM - 12PM)</option>
                        <option>Afternoon (12PM - 5PM)</option>
                        <option>Evening (5PM - 8PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="text">
                      Service Address *
                    </label>
                    <input
                      type="text"
                      id="text"
                      className="w-full mt-1 p-2 border rounded-md"
                      placeholder="Enter your complete address..."
                      value={bookingForm.address}
                      onChange={(e) =>
                        setBookingForm((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="description"
                    >
                      Brief Description *
                    </label>
                    <textarea
                      id="description"
                      className="w-full mt-1 p-2 border rounded-md"
                      rows={3}
                      placeholder="Describe your service needs..."
                      value={bookingForm.description}
                      onChange={(e) =>
                        setBookingForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                {/* Provider Selection */}
                <div>
                  <h4 className="font-semibold mb-2">Available Providers *</h4>
                  {isTechnicianLoading ? (
                    <div className="text-center py-4">
                      Loading technicians...
                    </div>
                  ) : technicians && technicians.length > 0 ? (
                    <div className="space-y-2">
                      {technicians.map((tech) => (
                        <div
                          key={tech._id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                            bookingForm.selectedProvider === tech._id
                              ? "bg-primary/10 border-primary"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            setBookingForm((prev) => ({
                              ...prev,
                              selectedProvider: tech._id,
                            }))
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {tech.userName || "Technician"}
                              </p>
                              <div className="flex items-center gap-1">
                                <span className="text-sm capitalize">
                                  {tech.skills}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={tech.isActive ? "default" : "secondary"}
                            >
                              {tech.isActive ? "Available" : "Unavailable"}
                            </Badge>
                            {bookingForm.selectedProvider === tech._id && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No technicians available for this service
                    </div>
                  )}

                  {bookingForm.selectedProvider && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Selected:{" "}
                      <strong>
                        {technicians?.find(
                          (t) => t._id === bookingForm.selectedProvider
                        )?.userName || "None"}
                      </strong>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsBookingModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Confirm Booking</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <BookingList isMyBookingsOpen={isMyBookingsOpen} setIsMyBookingsOpen={setIsMyBookingsOpen} />
    </main>
  );
};

export const HomeFooter = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">FixMeKH</h4>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for booking verified home service providers.
              Simplifying home maintenance with digital convenience.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Plumbing Services</li>
              <li>Electrical Work</li>
              <li>Cleaning Services</li>
              <li>Appliance Repair</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Phone: +855 12 345 678</li>
              <li>Email: support@fixmekh.com</li>
              <li>Hours: 24/7 Customer Support</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <Button variant="ghost">
                <FaFacebook />
              </Button>
              <Button variant="ghost">
                <FaXTwitter />
              </Button>
              <Button variant="ghost">
                <FaInstagram />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center w-full">
          <p className="text-sm text-muted-foreground">
            © 2024 FixMeKH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
