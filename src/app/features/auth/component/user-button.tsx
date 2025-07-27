import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader, LogOut } from "lucide-react";
import image from "next/image";
import { useCurrentUsers } from "../api/use-current-user";
import { useState } from "react";
import { CreatePhoneModal } from "@/components/home/create-phone-modal";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useCurrentUsers();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) {
    return null;
  }

  const { _id, name, image, phone, role } = data;

  const avatarFallback = name!.charAt(0).toUpperCase();

  const handleProfile = () => {
    router.push(`/user/${_id}`);
  };

  const handleAdmin = () => {
    router.push(`/admin/dashboard`);
  };

  const handleHome = () => {
    router.push(`/`);
  };

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-75 transition">
            <AvatarImage alt={name} src={image} />
            <AvatarFallback className="bg-[#ee3d41] text-white">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem className="h-10" onClick={() => handleProfile()}>
            Profile
          </DropdownMenuItem>
          {role === "admin" && pathname == "/" && (
            <DropdownMenuItem onClick={() => handleAdmin()} className="h-10">
              Admin Dashboard
            </DropdownMenuItem>
          )}
          {pathname == "/" && (
            <DropdownMenuItem onClick={() => signOut()} className="h-10">
              <LogOut className="size-4 mr-2" />
              Log out
            </DropdownMenuItem>
          )}
          {pathname.startsWith("/admin") && (
            <DropdownMenuItem onClick={() => handleHome()} className="h-10">
              Home
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <CreatePhoneModal phone={phone} />
    </div>
  );
};
