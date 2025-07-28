import { useQueries, useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"




export const useAllBookings = () => {
  const bookings = useQuery(api.bookings.getAllBookings);
  return {bookings: bookings ?? [], isBookingLoading: bookings === undefined};
}




// export const useAllAdmins = () => {
//   const admins = useQuery(api.admins.getAdmins);
//   const isAdminsLoading = admins === undefined;
//   return {admins: admins ?? [], isAdminsLoading};
  
// }