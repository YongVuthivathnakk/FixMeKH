"use client";

import { HomeFooter, HomeHeader, HomeMain } from "@/components/home/home";

export default function Home() {
  return (
    <div>
      <HomeHeader/>
      <HomeMain />
      <HomeFooter />
    </div>
  );
}