import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);
const isAdminPage = createRouteMatcher(["/admin/auth"]);



export default convexAuthNextjsMiddleware(async (request, {convexAuth}) => {
  const pathname = request.nextUrl.pathname;


  if(pathname === "/") {
    if (!isPublicPage(request) && !(await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
  
    if(isPublicPage(request) && (await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/");
    }
  }

  // if(pathname === "/admin") {
  //   return nextjsMiddlewareRedirect(request, "/admin/auth");
  // }


});
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};