import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const useAllUsers = () => {
    const users = useQuery(api.users.getUsers);
    return users;
}