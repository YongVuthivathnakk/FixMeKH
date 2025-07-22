"use client";


import { useAllUsers } from "@/app/features/admin/api/use-all-users";
import { DataTable } from "@/components/data-table";
import  data  from "../data.json"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, SlidersHorizontal } from "lucide-react";


// const data = [
//     {
//         "id": 1,
//         "header": "Cover page",
//         "type": "Cover page",
//         "status": "In Process",
//         "target": "18",
//         "limit": "5",
//         "reviewer": "Eddie Lake"
//     },
// ];



const userDashboardPage = () => {


    const users = useAllUsers();


    // const users = [
    //     {
    //         id: 1,
    //         name: "user01",
    //         verificationTime: "1/1/1, 09:11:10",
    //         phone: "123",
    //         role: "user",
    //     },
    //     {
    //         id: 2,
    //         name: "user01",
    //         verificationTime: "1/1/1, 09:11:10",
    //         phone: "123",
    //         role: "user",
    //     }
    // ];


    return (
        <>
            
        </>
    );
}

export default userDashboardPage;