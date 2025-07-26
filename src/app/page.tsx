"use client";

import { useState } from "react";
import { HomeFooter, HomeHeader, HomeMain } from "@/components/home/home";
import { AuthScreen } from "./features/auth/component/auth-screen";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";


export default function Home() {
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  
  const router = useRouter();

  // Query current user session (assuming you're using Convex auth session API)
  const session = useQuery(api.auth.isAuthenticated);

  useEffect(() => {
    if (session) {
      router.replace("/"); // ⬅ client-side route change
    }
  }, [session, router]);
  
  return (
    <div>
      <HomeHeader onOpenMyBookings={() => setIsMyBookingsOpen(true)} />
      <HomeMain 
        isMyBookingsOpen={isMyBookingsOpen}
        setIsMyBookingsOpen={setIsMyBookingsOpen}
      />
      <HomeFooter />
    </div>
  );
}