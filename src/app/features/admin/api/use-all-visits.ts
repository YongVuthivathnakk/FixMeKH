import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Island_Moments } from "next/font/google";

export const useAllVisits = () => {
  const visits = useQuery(api.visits.getVisits);
  return{ data: visits ?? [], isLoading: visits === undefined};
}