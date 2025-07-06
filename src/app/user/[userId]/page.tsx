"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { UserHeader } from "./components/user-header";

export default function UserPage() {
    const user = useQuery(api.users.current);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                </div>
            </div>
        );
    }

    const { name, image } = user;

    return (
        <div className="container mx-auto px-4 py-8">
            <UserHeader name={name} image={image} />
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                <div className="bg-card p-6 rounded-lg shadow">
                    <p className="text-muted-foreground">
                        Welcome, {name || "User"}!
                    </p>
                </div>
            </div>
        </div>
    );
}