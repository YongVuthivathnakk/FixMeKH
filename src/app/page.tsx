"use client";

import { HomeFooter, HomeHeader, HomeMain } from "@/components/home/home";
import { AuthScreen } from "./features/auth/component/auth-screen";


export default function Home() {

  
  return (
    <div>
      <HomeHeader/>
      <HomeMain />
      <HomeFooter />
    </div>
  );
}