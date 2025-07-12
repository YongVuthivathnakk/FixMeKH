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


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const role = useCurrentUserRole();
  const router = useRouter();

  if (role && role !== 'admin') {
    router.replace('/unauthorized');
  }

  if (role === null) {
    router.replace('/unauthorized');
  }

  if (role !== 'admin') {
    return (
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <p className="text-lg font-bold">Authorizing</p>
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div className="flex h-full">
        <div className="h-full w-50 sm:w-70 lg:w-80 xl:w-100">
          <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        <div className="w-full">
          <AdminTopBar currentPage={currentPage} />
          {children}
        </div>
      </div>
    );
  }
};

export default AdminLayout;
