"use client"

import Image from "next/image";
import { AuthScreen } from "./features/auth/api/component/auth-screen";

export default function Home() {
  return (
    // <div className="h-full flex items-center justify-center bg-[#086179]">
        <AuthScreen />
    // </div>
  );
}
