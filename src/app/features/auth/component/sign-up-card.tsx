import { SignInFlow } from "@/app/features/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { api } from "../../../../../convex/_generated/api";

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}


export const SignUpCard = ({ setState }: SignUpCardProps) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    const { signIn } = useAuthActions();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password did not match");
            return;
        }
        signIn("password", { email, name, password, flow: "signUp" })
            .catch(() => {
                setError("something went wrong");
            })
            .finally(() => {
                setIsPending(false)
            });
        setIsPending(true);

    }

    const handleProvider = (value: "google") => {
        signIn(value);
    }


    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="p-0">
                <CardTitle className="text-2xl">Sign up to continue</CardTitle>
                <CardDescription className="font-normal">
                    Use your email or another to continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="space-y-2.5">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isPending}
                        placeholder="email"
                        type="email"
                        required
                    />

                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        placeholder="username"
                        type="text"
                        required
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isPending}
                        placeholder="password"
                        type="password"
                        required
                    />

                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isPending}
                        placeholder="confirm password"
                        type="password"
                        required
                    />
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        size={"lg"}
                        disabled={isPending}
                    >
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={isPending}
                        onClick={() => handleProvider("google")}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full relative cursor-pointer"
                    >
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                        <span>Continue With Google</span>
                    </Button>

                </div>
                <p onClick={() => { setState("signIn") }} className="text-xs text-muted-foreground">
                    Already have an account? <span className="text-sky-700 hover:underline cursor-pointer">Sign In</span>
                </p>
            </CardContent>
        </Card>
    )
}