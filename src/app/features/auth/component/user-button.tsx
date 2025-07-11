import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthActions } from "@convex-dev/auth/react"
import { Loader, LogOut } from "lucide-react";
import image from "next/image";
import { useCurrentUsers } from "../api/use-current-user";
import { useState } from "react";
import { CreatePhoneModal } from "@/components/home/create-phone-modal";
import { useRouter } from "next/navigation";




export const UserButton = () => {
    const { signOut } = useAuthActions();
    const router = useRouter();
    const { data, isLoading } = useCurrentUsers();
    
    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if (!data) {
        return null;
    }

    const { _id, _creationTime, name, image, email, phone } = data;

    const avatarFallback = name!.charAt(0).toUpperCase();

    const handleProfile = () => {
        router.push(`/user/${_id}`);
    }


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
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>

                    <DropdownMenuItem className="h-10" onClick={() => handleProfile()}>
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="h-10">
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="h-10">
                        <LogOut className="size-4 mr-2" />
                        Log out
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            <CreatePhoneModal phone={phone} />
        </div>
    )
}