import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export const useGetVerificationTime = () => {
  const time = useQuery(api.users.getEmailVerificationTime);
  const isUsersLoading = time === undefined;
  return { users: time ?? [], isUsersLoading };
};
