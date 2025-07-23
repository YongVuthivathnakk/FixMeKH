"use client";
import { currentUserIdAtom } from "@/app/admin/atoms/current-user";
import { useCurrentUsers } from "@/app/features/auth/api/use-current-user";
import { useGetUserById } from "@/app/features/auth/api/use-user-by-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAtom } from "jotai";
import { ArrowLeft, Camera, CircleArrowLeftIcon, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface UserDetailProps {
  params: {
    userId: string;
  };
}

const UserDetail = ({ params }: UserDetailProps) => {
  const router = useRouter();
  const [currentUserId] = useAtom(currentUserIdAtom);
  console.log(currentUserId);
  const { data, isLoading } = useGetUserById(currentUserId);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <p className="text-lg font-bold">Loading</p>
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { _creationTime, name, image, email, phone } = data;

  const avatarFallback = name!.charAt(0).toUpperCase();

  const memberTime = new Date(_creationTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className=" w-full flex flex-col ">
      <header className="w-full mb-10 px-5 pt-5">
        <Button variant={"outline"} onClick={() => router.back()}>
          <ArrowLeft />
          <span>Back</span>
        </Button>
      </header>
      <main className="px-5 sm:px-20 lg:px-40 ">
        <Card className="fex justify-center items-center w-full">
          <CardHeader className="w-50">
            <CardTitle className="text-center">My Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 flex flex-col justify-center items-center">
            <Avatar className="size-20 hover:opacity-75 transition ">
              <AvatarImage alt={name} src={image} />
              <AvatarFallback className="bg-[#ee3d41] text-white text-4xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <p className="text-center text-2xl font-medium">{name}</p>
          </CardContent>
          <CardFooter>
            <CardDescription>Member since {memberTime}</CardDescription>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default UserDetail;
