"use client";

import { useAllAdmins } from "@/app/features/admin/api/use-all-admins";
import { DataTable } from "../component/table/data-table";
import { Loader } from "lucide-react";
import { AdminColumns } from "../component/table/columns";

const TeamsDashboardPage = () => {


    const {admins, isAdminsLoading} = useAllAdmins();
    if(isAdminsLoading) {
            return (
    <div className="flex flex-col h-full gap-y-4 items-center justify-center">
         <p className="text-lg font-bold">Loading</p>
         <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
    }

  return (
      <div className="container mx-auto py-10">
        <DataTable columns={AdminColumns} showCreateButton={false} data={admins} />
      </div>
  );
};

export default TeamsDashboardPage;
