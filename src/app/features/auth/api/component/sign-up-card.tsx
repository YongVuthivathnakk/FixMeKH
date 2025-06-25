import { SignInFlow } from "@/app/features/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}


export const SignUpCard = ({ setState }: SignUpCardProps) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="p-0">
                <CardTitle className="text-2xl">Sign up to continue</CardTitle>
                <CardDescription className="font-normal">
                    Use your email or another to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={false}
                        placeholder="email"
                        type="email"
                        required
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={false}
                        placeholder="password"
                        type="passowrd"
                        required
                    />

                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={false}
                        placeholder="confirm password"
                        type="passowrd"
                        required
                    />
                    <Button type="submit" className="w-full" size={"lg"} disabled={false}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={false}
                        onClick={() => { }}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full flex justify-between"
                    >
                        <FcGoogle className="size-5" />
                        <span>Continue With Google</span>
                        <div />
                    </Button>
                </div>
                <p onClick={() => { setState("signIn") }} className="text-xs text-muted-foreground">
                    Already have an account? <span className="text-sky-700 hover:underline cursor-pointer">Sign In</span>
                </p>
            </CardContent>
        </Card>
    )
}