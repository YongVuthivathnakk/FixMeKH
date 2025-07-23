"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { RouteMatcher } from "next/dist/server/route-matchers/route-matcher";
import { useRouter } from "next/navigation";
import { currentUserIdAtom } from "../../atoms/current-user";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  _id: string;
  email?: string;
  emailVerificationTime?: number;
  image?: string;
  isAnonymous?: boolean;
  name?: string;
  phone?: string;
  phoneVerificationTime?: number;
  role?: "admin" | "user";
  _creationTime: number;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "_creationTime",
    header: "_creationTime",
    cell: ({ row }) => {
      const timestamp = row.getValue<number>("_creationTime");
      const date = new Date(timestamp);
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const email = row.original;
      const router = useRouter();
      const [currentUserId, setCurrentUserId] = useAtom(currentUserIdAtom);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(email._id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (email._id) {
                  setCurrentUserId(email._id);
                  router.push(`/user/detail/${email._id}`);
                }
              }}
              disabled={!email._id}
            >
              View user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
