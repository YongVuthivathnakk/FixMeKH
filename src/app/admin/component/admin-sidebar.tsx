import { Home, LayoutDashboard, LogOut, User, UserRoundCog, Users, Users2 } from "lucide-react";
import { AdminSidebarButton } from "./admin-sidebar-button";
import { UserButton } from "@/app/features/auth/component/user-button";
import { useCurrentUsers } from "@/app/features/auth/api/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { AdminLogoutButton } from "./admin-logout-button";

interface AdminSidebarProps {
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
}

export const AdminSidebar = ({ currentPage, setCurrentPage } : AdminSidebarProps) => {  
    const { data, isLoading } = useCurrentUsers();
    const { name } = data || {};
    const { signOut } = useAuthActions();
    
    const username = name?.charAt(0).toUpperCase() + String(name).slice(1);

    
    return (
        <aside className="h-full flex flex-col gap-y-4 pt-[9px] pb-[12.5px] border-r-1">
            <div className="flex gap-y-1 px-3 gap-x-5">
                <UserButton />
                <div className="flex flex-col justify-center">
                    <p className="text-[15px] font-semibold">Admin</p>
                    <span className="text-[11px] text-muted-foreground">{username}</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-1.5 ">
                <p className="px-3 text-[13px] font-semibold" >Page</p>
                <AdminSidebarButton currentPage={currentPage} setCurrentPage={setCurrentPage} icon={LayoutDashboard} label={"Dashboard"} />
                <AdminSidebarButton currentPage={currentPage} setCurrentPage={setCurrentPage} icon={User} label={"Users"} />
                <AdminSidebarButton currentPage={currentPage} setCurrentPage={setCurrentPage} icon={UserRoundCog} label={"Technicians"} />
                <AdminSidebarButton currentPage={currentPage} setCurrentPage={setCurrentPage} icon={Users} label={"Teams"} />
            </div>
            <div className="flex flex-col gap-y-1.5">
                <p className="px-3 text-[13px] font-semibold">User</p>
                <AdminLogoutButton handleClick={signOut} icon={LogOut} label={"Logout"} />
            </div>

        </aside>
    )
};