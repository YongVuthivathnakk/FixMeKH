import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "sonner";
import { ConvexClientProvider } from "../providers/convex-client-provider";


interface adminLayoutProps {
  children: React.ReactNode
}

const adminLayout = ( { children } : adminLayoutProps ) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default adminLayout;