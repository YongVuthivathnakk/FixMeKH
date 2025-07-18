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
            <Card className="w-full mx-2 lg:mx-4 shadow-sm border rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
                    <CardTitle className="text-sm font-semibold">User Table</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1 h-7 px-2 text-xs">
                        <SlidersHorizontal className="w-3 h-3" />
                        Filter
                    </Button>
                </CardHeader>

                <CardContent className="px-0 py-1">
                    <div className="overflow-x-auto">
                        <Table className="w-full text-xs">
                            <TableHeader>
                                <TableRow className="h-8">
                                    <TableHead className="w-[32px] px-1 py-1">
                                        <Checkbox className="w-3 h-3" />
                                    </TableHead>
                                    <TableHead className="w-[160px] px-1 py-1 truncate">_id</TableHead>
                                    <TableHead className="px-1 py-1">Email</TableHead>
                                    <TableHead className="px-1 py-1">Verified</TableHead>
                                    <TableHead className="px-1 py-1">Image</TableHead>
                                    <TableHead className="w-[32px] px-1 py-1" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.map((user) => (
                                    <TableRow key={user._id} className="h-8">
                                        <TableCell className="px-1 py-1">
                                            <Checkbox className="w-3 h-3" />
                                        </TableCell>
                                        <TableCell className="px-1 py-1 truncate text-muted-foreground">
                                            {user._id}
                                        </TableCell>
                                        <TableCell className="px-1 py-1 truncate">{user.email}</TableCell>
                                        <TableCell className="px-1 py-1 text-muted-foreground">
                                            {user.emailVerificationTime || "unset"}
                                        </TableCell>
                                        <TableCell className="px-1 py-1">
                                            {user.image === "unset" ? (
                                                <span className="text-muted-foreground text-[10px]">unset</span>
                                            ) : (
                                                <img
                                                    src={user.image}
                                                    alt="avatar"
                                                    className="w-4 h-4 rounded-full object-cover"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-1 py-1 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 p-0"
                                            >
                                                <MoreHorizontal className="w-3 h-3" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            {/* <DataTable data={data} /> */}
        </>
    );
}

export default userDashboardPage;