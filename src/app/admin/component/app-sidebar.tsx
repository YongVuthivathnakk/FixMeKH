"use client";

import {
  ChevronUp,
  File,
  FileText,
  LucideLayoutDashboard,
  User2,
  UserCog2,
  UsersRound,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { currentPageAtom } from "../atoms/current-page";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { Item } from "@radix-ui/react-dropdown-menu";


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User2,
  },
  {
    title: "Technicains",
    url: "/admin/technicians",
    icon: Wrench,
  },
  {
    title: "Teams",
    url: "/admin/teams",
    icon: UsersRound,
  },
    {
    title: "bookings",
    url: "/admin/bookings",
    icon: FileText,
  },
];




export function AppSidebar() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const router = useRouter();

  const handleActive = (url: string) => {
    return pathname === url;
  };

  useEffect(() => {
    const item = items.find(i => i.url === pathname);
    if(item && currentPage !== item.title) {
      setCurrentPage(item.title);
    }
  }, [pathname]);


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="cursor-default" onClick={() => router.push("/")}>
            FixMeKH
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={handleActive(item.url)} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
