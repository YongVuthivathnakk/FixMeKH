"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AdminSidebar } from "./component/admin-sidebar";
import { AdminTopBar } from "./component/admin-topbar";
import { JotaiProvider } from "../providers/jotai-provider";
import { useState } from "react";
// import { Sidebar } from "./component/sidebar";
// import { Toolbar } from "./component/toolbar";
// import { WorkspaceSidebar } from "./component/workspace-sidebar";

interface WorksapceIdLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: WorksapceIdLayoutProps) => {
    const [currentPage, setCurrentPage] = useState("Dashboard");


  return (
    <div className="flex h-full">
      <div className="h-full w-50 sm:w-70 lg:w-80 xl:w-100">
        <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <div className="w-full">
        <AdminTopBar currentPage={currentPage}/>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
