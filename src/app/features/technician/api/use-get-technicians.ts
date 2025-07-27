import { useQuery } from "convex/react";
import { Skill } from "../../types";
import { api } from "../../../../../convex/_generated/api";

export const useGetTechnicians = (skill: Skill) => {

  const technicians = useQuery(api.technicians.getTechniciansBySkill, { skill });
  return {technicians: technicians, isTechnicianLoading: technicians === undefined}
}