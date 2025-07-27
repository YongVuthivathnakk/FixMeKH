/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admins from "../admins.js";
import type * as auth from "../auth.js";
import type * as authSessions from "../authSessions.js";
import type * as bookings from "../bookings.js";
import type * as http from "../http.js";
import type * as technicians from "../technicians.js";
import type * as users from "../users.js";
import type * as visits from "../visits.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admins: typeof admins;
  auth: typeof auth;
  authSessions: typeof authSessions;
  bookings: typeof bookings;
  http: typeof http;
  technicians: typeof technicians;
  users: typeof users;
  visits: typeof visits;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
