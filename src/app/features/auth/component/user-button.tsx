import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const UserButton = () => {
    const user = useQuery(api.users.current);

    if (!user) {
        return (
            <ClerkUserButton />
        );
    }

    const { name, image } = user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={image} alt={name || "User"} />
                    <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                    <ClerkUserButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};