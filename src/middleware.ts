import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { auth } from "../convex/auth";
import { useCurrentUserRole } from "./app/features/auth/api/use-current-user-role";

const isPublicPage = createRouteMatcher(["/auth", "/unauthorized"]);
const isAdminPage = createRouteMatcher(["/admin"]);


export default convexAuthNextjsMiddleware(async (request) => {
  if(!isPublicPage(request) && !(await isAuthenticatedNextjs()) ){
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if(isPublicPage(request) && (await isAuthenticatedNextjs())){
    return nextjsMiddlewareRedirect(request, "/");
  }

  if (isAdminPage(request)) {
    const role : string = "admin";
    if (role !== "admin") {
      return nextjsMiddlewareRedirect(request, "/unauthorized");
    }
  }
});
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};