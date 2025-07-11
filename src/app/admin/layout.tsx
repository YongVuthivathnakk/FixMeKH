"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable";
import { AdminSidebar } from "./component/admin-sidebar";
import { AdminTopBar } from "./component/admin-topbar";
// import { Sidebar } from "./component/sidebar";
// import { Toolbar } from "./component/toolbar";
// import { WorkspaceSidebar } from "./component/workspace-sidebar";

interface WorksapceIdLayoutProps {
    children: React.ReactNode;
};


const AdminLayout = ({ children }: WorksapceIdLayoutProps) => {
    return (
        <div className="flex h-full">
            <div className="h-full w-50 sm:w-70 lg:w-80 xl:w-100">
                <AdminSidebar />
            </div>
            <div className="w-full">
                <AdminTopBar />
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;