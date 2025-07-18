"use client";

import { useAllUsers } from "@/app/features/admin/api/use-all-users";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

const AdminDashboardPage = () => {

  const data = [
    {
        "id": 1,
        "header": "Cover page",
        "type": "Cover page",
        "status": "In Process",
        "target": "18",
        "limit": "5",
        "reviewer": "Eddie Lake"
    },
];


  // Users
    const users = useAllUsers();



  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
};

export default AdminDashboardPage;
