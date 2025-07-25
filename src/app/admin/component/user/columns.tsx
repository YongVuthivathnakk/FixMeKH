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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";

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
      const user = row.original;
      const router = useRouter();
      const [currentUserId, setCurrentUserId] = useAtom(currentUserIdAtom);

      const updateUserRole = useMutation(api.users.updateUserRole);

      const [dialogOpen, setDialogOpen] = useState(false);
      const [selectedRole, setSelectedRole] = useState<"admin" | "user" | undefined>(undefined);
      const [confirmStep, setConfirmStep] = useState(false);

      const handleRoleSelect = (role: "admin" | "user") => {
        setSelectedRole(role);
        setConfirmStep(true);
      };

      const handleConfirm = async () => {
        if (!selectedRole) return;
        await updateUserRole({ userId: user._id, newRole: selectedRole });
        setDialogOpen(false);
        setSelectedRole(undefined);
        setConfirmStep(false);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user._id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCurrentUserId(user._id);
                  router.push(`/user/detail/${user._id}`);
                }}
              >
                View user
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                Change Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setConfirmStep(false);
              setSelectedRole(undefined);
            }
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {confirmStep ? "Confirm Role Change" : "Select Role"}
                </DialogTitle>
                <DialogDescription>
                  {confirmStep
                    ? `Are you sure you want to change this user's role to "${selectedRole}"?`
                    : "Choose a role to assign to this user."}
                </DialogDescription>
              </DialogHeader>

              {!confirmStep ? (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => handleRoleSelect("user")}>
                    Make User
                  </Button>
                  <Button onClick={() => handleRoleSelect("admin")}>
                    Make Admin
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleConfirm}>Confirm</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
