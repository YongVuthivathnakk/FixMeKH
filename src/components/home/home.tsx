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

/**
 * Home Page Components for FixMeKH - Home Service Booking Platform
 * Built with Tailwind CSS and TypeScript (.tsx)
 * Features: Responsive design, service categories, platform features, and booking interface
 */

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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<any>(null);
  const [isBookingDetailOpen, setIsBookingDetailOpen] = useState(false);
  const [selectTechnician, setSelectTechnician] = useState("");
  const [skill, setSkill] = useState<Skill>("plumber");
  const [data, setData] = useState<any>();
  const { technicians, isLoading } = useGetTechnicians(skill);
  useEffect(() => {
    console.log(technicians);
  }, [technicians]);

  // Form data states
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "Morning (9AM - 12PM)",
    description: "",
    address: "",
    selectedProvider: selectTechnician,
  });

  // isMyBookingsOpen state is now passed as props

  // Sample booking data (in real app, this would come from your database/API)
//   const [myBookings, setMyBookings] = useState([
//     {
//       id: 1,
//       service: "Plumbing Services",
//       provider: "Professional Team A",
//       providerPhone: "+855 12 345 678",
//       providerEmail: "team.a@fixmekh.com",
//       date: "2025-01-30",
//       time: "Morning (9AM - 12PM)",
//       status: "Confirmed",
//       description: "Fix kitchen sink leak and check water pressure",
//       price: "$85",
//       address: "123 Main Street, Phnom Penh",
//       bookingDate: "2025-01-26",
//       estimatedDuration: "2-3 hours",
//       notes: "Please call before arriving. Gate code: 1234",
//       paymentMethod: "Cash on completion",
//     },
//     {
//       id: 2,
//       service: "Electrical Work",
//       provider: "Expert Services Co.",
//       providerPhone: "+855 12 987 654",
//       providerEmail: "info@expertservices.com",
//       date: "2025-02-02",
//       time: "Afternoon (12PM - 5PM)",
//       status: "Pending",
//       description: "Install new lighting fixtures in living room and bedroom",
//       price: "$150",
//       address: "456 Oak Avenue, Phnom Penh",
//       bookingDate: "2025-01-25",
//       estimatedDuration: "3-4 hours",
//       notes: "Bring LED bulbs. Customer will provide ladder if needed.",
//       paymentMethod: "Bank transfer",
//     },
//   ]);

  const handleServiceBooking = (serviceName: Skill) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
    setSkill(serviceName);

    // get data with the api
    console.log(data);
    // Reset form when opening new booking
    setBookingForm({
      date: "",
      time: "Morning (9AM - 12PM)",
      description: "",
      address: "",
      selectedProvider: selectTechnician,
    });
  };

  const handleBookingSubmit = () => {
    // Validate form data
    if (!bookingForm.date || !bookingForm.description || !bookingForm.address) {
      alert("Please fill in all required fields (Date, Description, Address)");
      return;
    }

    // Get provider details based on selection
    const providerDetails = {
      "Professional Team A": {
        phone: "+855 12 345 678",
        email: "team.a@fixmekh.com",
      },
      "Expert Services Co.": {
        phone: "+855 12 987 654",
        email: "info@expertservices.com",
      },
    };

    const selectedProviderInfo =
      providerDetails[
        bookingForm.selectedProvider as keyof typeof providerDetails
      ];

    // Create new booking object with actual form data

    // Add to bookings list
    // setMyBookings((prev) => [...prev, newBooking]);

    // Show success message and close modal
    alert(
      `Booking confirmed for ${selectedService} on ${bookingForm.date} at ${bookingForm.time}!`
    );

    setIsBookingModalOpen(false);
  };

  const handleViewBookingDetail = (booking: any) => {
    setSelectedBookingDetail(booking);
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
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-2 hover:border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle>Plumbing Services</CardTitle>
                </div>
                <Badge variant="secondary">Available</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <CardDescription className="mb-4">
                Pipe repairs, leak fixes, drain cleaning, faucet installation,
                and emergency plumbing services.
              </CardDescription>
              <Button
                size="sm"
                className="w-full mt-auto"
                onClick={() => handleServiceBooking("plumber")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-2 hover:border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle>Electrical Work</CardTitle>
                </div>
                <Badge variant="secondary">Available</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <CardDescription className="mb-4">
                Wiring installation, outlet repairs, lighting fixtures,
                electrical panel upgrades, and safety inspections.
              </CardDescription>
              <Button
                size="sm"
                className="w-full mt-auto"
                onClick={() => handleServiceBooking("electrician")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-2 hover:border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle>Cleaning Services</CardTitle>
                </div>
                <Badge variant="secondary">Available</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <CardDescription className="mb-4">
                Deep cleaning, regular housekeeping, carpet cleaning, window
                washing, and post-construction cleanup.
              </CardDescription>
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleServiceBooking("cleaner")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-2 hover:border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle>Appliance Repair</CardTitle>
                </div>
                <Badge variant="secondary">Available</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <CardDescription className="mb-4">
                Refrigerator, washing machine, dishwasher, oven repairs, and
                appliance maintenance services.
              </CardDescription>
              <Button
                size="sm"
                className="w-full mt-auto"
                onClick={() => handleServiceBooking("appliance repair")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Platform Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Verified Providers</h4>
            <p className="text-muted-foreground">
              All service providers are thoroughly vetted and verified for your
              safety and peace of mind
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Provider Ratings</h4>
            <p className="text-muted-foreground">
              Read reviews and ratings from other customers to choose the best
              service provider
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Real-time Updates</h4>
            <p className="text-muted-foreground">
              Track your service appointment with live updates and notifications
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold mb-2">Browse Services</h4>
            <p className="text-muted-foreground">
              Browse through our service categories and find what you need
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-semibold mb-2">Schedule Appointment</h4>
            <p className="text-muted-foreground">
              Choose your preferred time and book with verified providers
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-semibold mb-2">Get Service Done</h4>
            <p className="text-muted-foreground">
              Enjoy professional service with real-time tracking and updates
            </p>
          </div>
        </div>
      </section>

      {/* Service Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
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
                    <strong>Price Range:</strong> $50 - $200 (varies by service)
                  </p>
                </div>
              </div>

              {/* Quick Booking Form */}
              <div className="space-y-4">
                <h4 className="font-semibold">Quick Booking</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Preferred Date *
                    </label>
                    <input
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
                    <label className="text-sm font-medium">
                      Preferred Time
                    </label>
                    <select
                      className="w-full mt-1 p-2 border rounded-md"
                      value={bookingForm.time}
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
                  <label className="text-sm font-medium">
                    Service Address *
                  </label>
                  <input
                    type="text"
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
                  <label className="text-sm font-medium">
                    Brief Description *
                  </label>
                  <textarea
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
                <h4 className="font-semibold mb-2">Available Providers</h4>
                {isLoading ? (
                  <div className="text-center py-4">Loading technicians...</div>
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
            <Button onClick={handleBookingSubmit}>Confirm Booking</Button>
          </div>
        </DialogContent>
      </Dialog>
      <BookingList />
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
