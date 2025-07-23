import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);
const isAdminPage = createRouteMatcher(["/admin"]);


export default convexAuthNextjsMiddleware(async (request) => {
  if(!isPublicPage(request) && !(await isAuthenticatedNextjs()) ){
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if(isPublicPage(request) && (await isAuthenticatedNextjs())){
    return nextjsMiddlewareRedirect(request, "/");
  }

  if(isAdminPage(request)){
    return nextjsMiddlewareRedirect(request, "/admin/dashboard");
  }

});
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};