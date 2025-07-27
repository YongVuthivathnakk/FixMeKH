import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const useAllAdmins = () => {
  const admins = useQuery(api.admins.getAdmins);
  const isAdminsLoading = admins === undefined;
  return {admins: admins ?? [], isAdminsLoading};
  
}