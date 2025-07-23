import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel";


export const useGetUserById = (_id: string | undefined) => {
  const data = useQuery(api.users.getUserById, _id ? { _id } : "skip");
  const isLoading = data === undefined;
  return { data, isLoading };
}