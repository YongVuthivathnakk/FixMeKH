import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { IconType } from "react-icons/lib";
import { useCurrentPage } from "../context/use-current-page";

interface AdminSidebarButtonProps {
    icon: LucideIcon | IconType,
    label: string,
    isActive?: boolean,
    handleClick?: () => void,
    setCurrentPage?: React.Dispatch<React.SetStateAction<string>>,
    currentPage?: string,
}

 

export const AdminSidebarButton = ({
    icon: Icon,
    label,
    isActive,
    setCurrentPage,
    currentPage
}: AdminSidebarButtonProps) => {

    

    const router = useRouter();

    const handleClick = () => {
        setCurrentPage?.(label);
        router.push(`/admin/${label.toLowerCase()}`);
    };

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