import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PhoneInput from 'react-phone-number-input';
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";


interface CreatePhoneModalProps {
    phone: string | undefined;
}


export const CreatePhoneModal = ({ phone }: CreatePhoneModalProps) => {
    const [open, setOpen] = useState(!phone);
    const [phoneNumber, setPhoneNumber] = useState("");
    const updateUserPhone = useMutation(api.users.updatePhone);
    const defineDefaultRole = useMutation(api.users.defineDefaultRole)
    const [error, setError] = useState("");


    useEffect(() => {
        setOpen(!phone);
    }, [phone]);

    const handleClose = () => {
        if (!phone) {
            setOpen(!phone);
            setError("You must enter your phone number");
        } else {
            setOpen(false);
        }
        setPhoneNumber("");
        
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateUserPhone({ phone: phoneNumber });
            await defineDefaultRole();
            toast.success("Phone number added successfully!");
        } catch (err) {
            setError("Failed to update phone number!")
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Your Phone Number</DialogTitle>
                </DialogHeader>
                {!!error && (
                    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
                        <TriangleAlert className="size-4" />
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-2.5">

                    <PhoneInput
                        international
                        defaultCountry="CA"
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value || "")}
                        placeholder="Enter Phone number"
                    // className="border-1 p-2 rounded-sm"
                    />
                    <div className="flex justify-end">
                        <Button disabled={false}>
                            Add 
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}