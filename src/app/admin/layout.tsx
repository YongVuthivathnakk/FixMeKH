"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AdminSidebar } from "./component/admin-sidebar";
import { AdminTopBar } from "./component/admin-topbar";
import { JotaiProvider } from "../providers/jotai-provider";
import { useEffect, useState } from "react";
import { useCurrentUserRole } from "../features/auth/api/use-current-user-role";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { CurrentPageContext } from "./context/use-current-page";
import { useAtom } from "jotai";
import { currentPageAtom } from "./atoms/current-page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import data from "./data.json";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const role = useCurrentUserRole();
  const router = useRouter();

  useEffect(() => {
    if (role === null || (role && role !== "admin")) {
      router.replace("/unauthorized");
    }
  }, [role, router]);

  if (role == undefined || role == null || role !== "admin") {
    return (
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <p className="text-lg font-bold">Authorizing</p>
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (role === "admin") {
    return (
      <JotaiProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                  {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </JotaiProvider>
    );
  }
};

export default AdminLayout;
