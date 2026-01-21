import { createAuthClient } from "better-auth/react";
import { authBaseUrl } from "../constants";
export const authClient = createAuthClient({
  baseURL: authBaseUrl,
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signOut,
  signUp,
  requestPasswordReset,
  verifyEmail,
  sendVerificationEmail,
  resetPassword,
  useSession,
} = authClient;
