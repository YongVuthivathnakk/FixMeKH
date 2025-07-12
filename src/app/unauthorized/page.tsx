"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
        const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
        <div className="flex items-center justify-center">
            <h1 className="px-5 text-2xl font-bold border-r-[1.5px]">Unauthorized</h1>
            <div className="flex flex-col items-center justify-center space-y-4 px-5">
                <p className="text-sm">You do not have permission to access this page.</p>
            </div>
        </div>
        <Button variant={"outline"} onClick={() => router.push("/")}>Go back to Home</Button>
    </div>
  );
}

export default UnauthorizedPage;