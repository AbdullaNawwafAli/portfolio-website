import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // This callback runs during the authorization flow
    async signIn({ profile }) {
      // Replace 'YOUR_GITHUB_ID' or 'YOUR_GITHUB_USERNAME' with your actual GitHub identifier.
      // You can check 'profile.id' (a number) or 'profile.login' (a string/username).
      const allowedGitHubUsername = process.env.ALLOWED_GITHUB_USERNAME;

      if (profile?.login?.toString() === allowedGitHubUsername) {
        return true; // Allow sign in
      } else {
        // Return false to deny access
        // You can also redirect to an error page or custom URL with:
        // return '/unauthorized'
        return false;
      }
    },
  },
});

console.log("Auth exports:", { auth, handlers, signIn, signOut });
