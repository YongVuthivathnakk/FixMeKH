import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const useCurrentUserRole = () => {
  const role = useQuery(api.users.userRole);
  return role;
}