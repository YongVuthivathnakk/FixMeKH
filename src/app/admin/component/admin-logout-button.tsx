import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface AdminLogoutButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
    currentPage?: string,
    handleClick?: () => void;
}

 

export const AdminLogoutButton = ({
    icon: Icon,
    label,
    handleClick,
}: AdminLogoutButtonProps) => {


    return (
        <div onClick={handleClick} className="flex flex-col gap-y-0.5 group px-3">
            <Button
                variant={"ghost"}
                className="w-full p-2 py-3 justify-start text-left text-sm font-normal gap-2"
            >
                <Icon className={`size-4 group-hover:text-foreground text-muted-foreground`} />
                <span className={`text-[14px] font-semibold text-muted-foreground group-hover:text-foreground`}>
                    {label}
                </span>
            </Button>
        </div>
    )
}