import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

const sidebarItemVarients = cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
    {
        variants: {
            variant: {
                default: "text-[#f9edffcc]",
                active: "text-[#481349] bg-white/90 hover:bg-white/90",
            }
        },
        defaultVariants: {
            variant: "default",
        },
    }
);


interface SidebarItemProps {
    label: string,
    id: string,
    icon: LucideIcon | IconType,
    variant?: VariantProps<typeof sidebarItemVarients>["variant"];
}

export const MenuItem = ({ 
    label,
    id,
    icon: Icon,
    variant,
 }: SidebarItemProps) => {
    return(
        <Button
            variant={'ghost'}
            size="sm"
            asChild
            className={cn(sidebarItemVarients({ variant: variant }))}
        >
            Click Me
        </Button>
    )
        
}

