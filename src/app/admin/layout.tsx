"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { JotaiProvider } from "../providers/jotai-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./component/app-sidebar";
import SidebarHeader from "./component/sidebar-header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  // const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const role = "admin"; //useCurrentUserRole();
  const router = useRouter();

  // useEffect(() => {
  //   if (role === null || (role && role !== "admin")) {
  //     router.replace("/unauthorized");
  //   }
  // }, [role, router]);

  // if (role == undefined || role == null || role !== "admin") {
  //   return (
  //     <div className="flex flex-col h-full gap-y-4 items-center justify-center">
  //       <p className="text-lg font-bold">Authorizing</p>
  //       <Loader className="size-4 animate-spin text-muted-foreground" />
  //     </div>
  //   );
  // }

  return (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarHeader />
          {children}
        </main>
      </SidebarProvider>
  );
};

export default AdminLayout;
