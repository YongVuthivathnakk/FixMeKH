import { useAuthActions } from "@convex-dev/auth/react"


import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "@/app/features/types";
import React, { useState } from "react";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}


export const SignInCard = ({setState}: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const { signOut } = useAuthActions();
  const { signIn } = useAuthActions();



  const handleProvider = (value: "google") => {
    signIn(value);
  } 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid Email or Password")
      })
      .finally(() => {
        setIsPending(false);
      })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl">Login to continue</CardTitle>
        <CardDescription className="font-normal">
          Use your email or another to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
          <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
            <TriangleAlert className="size-4"/>
            <p>{error}</p>
          </div>
        )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={(e) => handleSubmit(e)}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            placeholder="email"
            type="email"
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
          <Button type="submit" className="w-full" size={"lg"} disabled={isPending}>
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
        <p onClick={()=> {setState("signUp")}} className="text-xs text-muted-foreground">
            Don&apos;t have account? <span className="text-sky-700 hover:underline cursor-pointer">Sign Up</span>
        </p>
      </CardContent>
    </Card>
  );
};
