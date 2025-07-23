
"use client";

import { useAllUsers } from "@/app/features/admin/api/use-all-users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader, MoreHorizontal, SlidersHorizontal, Users } from "lucide-react";

import { columns, User } from "../component/user/columns"
import { DataTable } from "../component/user/data-table"
 
const userDashboardPage = () => {

const users = useAllUsers();
if(!users) {
    return (
    <div className="flex flex-col h-full gap-y-4 items-center justify-center">
         <p className="text-lg font-bold">Loading</p>
         <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
}
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  )
}

export default userDashboardPage;