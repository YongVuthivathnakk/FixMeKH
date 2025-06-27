import { UserButton } from "@/app/features/auth/component/user-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Toaster } from "sonner"



// TODO: Build the home Page UI here using Tailwind and typescript (.tsx)


export const HomeHeader = () => {
    return (
        <div>
            <Toaster />
            <UserButton />
        </div>
    )
}

export const HomeMain = () => {
    return (
        <div>
            Main
        </div>
    )
}

export const HomeFooter = () => {
    return (
        <div>
            Footer
        </div>
    )
}