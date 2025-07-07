"use client";
import { useCurrentUsers } from "@/app/features/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleArrowLeftIcon, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface UserIdpageProps {
    params: {
        userId: string;
    },
};


const UserIdPage = ({ params }: UserIdpageProps) => {
    const router = useRouter();
    const { data, isLoading } = useCurrentUsers();
    
    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if (!data) {
        return null;
    }

    const {_creationTime, name, image, email, phone } = data;

    const avatarFallback = name!.charAt(0).toUpperCase();

    
    return (
        <div>
            <CircleArrowLeftIcon onClick={() => router.back()} />
            <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage alt={name} src={image} />
                <AvatarFallback className="bg-[#ee3d41] text-white">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserIdPage