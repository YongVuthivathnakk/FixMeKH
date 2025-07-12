import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface AdminSidebarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
    currentPage?: string,
    handleClick?: () => void;
}


export const AdminSidebarButton = ({
    icon: Icon,
    label,
    isActive,
    currentPage,
    handleClick,
}: AdminSidebarButtonProps) => {
    isActive = currentPage == label;
    return (
        <div onClick={handleClick} className="flex flex-col gap-y-0.5 group px-3">
            <Button
                variant={"ghost"}
                className={cn(
                    "w-full p-2 py-3 justify-start text-left text-sm font-normal gap-2",
                    isActive && "bg-accent dark:bg-accent/50"
                )}
            >
                <Icon className={
                    `size-4 group-hover:text-foreground
                    ${isActive ? "text-accent-foreground" : "text-muted-foreground" }
                    `} />
                <span className={
                    `text-[14px] font-semibold  group-hover:text-foreground
                    ${isActive ? "text-accent-foreground" : "text-muted-foreground" }    
                    `
                    }>
                    {label}
                </span>
            </Button>
        </div>
    )
}