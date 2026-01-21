export const getSecurityMetadata = async () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // Server-side: Use next/headers
    const { cookies } = await import("next/headers");
    const store = await cookies();
    return {
      serverPublicKey: store.get("server_public_key")?.value,
      keyVersion: store.get("key_version")?.value || "1",
    };
  }

  // Client-side: Use native document.cookie to avoid 'js-cookie' dependency
  const getClientCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  };

  return {
    serverPublicKey: getClientCookie("server_public_key"),
    keyVersion: getClientCookie("key_version") || "1",
  };
};
