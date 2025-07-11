import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface AdminSidebarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
    onSignOut?: () => void;
}


export const AdminSidebarButton = ({
    icon: Icon,
    label,
    isActive,
    onSignOut,
}: AdminSidebarButtonProps) => {
    return (
        <div onClick={onSignOut} className="flex flex-col gap-y-0.5 cursor-pointer group px-3">
            <Button
                variant={"ghost"}
                className={cn(
                    "w-full p-2 py-3 justify-start text-left text-sm font-normal gap-2",
                    isActive && "bg-accent/50"
                )}
            >
                <Icon className="size-4 text-muted-foreground group-hover:text-foreground" />
                <span className="text-[14px] font-semibold text-muted-foreground group-hover:text-foreground">
                    {label}
                </span>
            </Button>
        </div>
    )
}