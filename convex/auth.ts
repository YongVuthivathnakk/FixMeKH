import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      profile(googleProfile, token) {
        return {
          id: googleProfile.id,
          name: googleProfile.name,
          email: googleProfile.email,
          image: googleProfile.picture,
          githubId: googleProfile.id,
        }
      }
    })
  ],
});
