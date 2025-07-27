import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const useAllTechnicians = () => {
  const technicians = useQuery(api.technicians.getTechnicians);
  const isTechniciansLoading = technicians === undefined;
  return {technicians: technicians ?? [], isTechniciansLoading};
}