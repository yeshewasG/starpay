import { createAuthClient } from "better-auth/react";
import { apiBaseUrl } from "../constants";
export const authClient = createAuthClient({
  baseURL: apiBaseUrl,
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
