import axios from "axios";
import { encodeBase64 } from "tweetnacl-util";
import { clientKeys, encryptPayload, decryptPayload } from "./encryption";
import { getSecurityMetadata } from "./cookies";
import { apiBaseUrl } from "./constants";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use(async (config) => {
  const { serverPublicKey, keyVersion } = await getSecurityMetadata();
  // Identification Headers
  config.headers["x-k"] = encodeBase64(clientKeys.publicKey);
  config.headers["x-key-version"] = keyVersion;

  // Encryption Logic
  if (config.data && serverPublicKey && typeof config.data === "object") {
    config.data = { payload: encryptPayload(config.data, serverPublicKey) };
  }
  return config;
});

apiClient.interceptors.response.use(async (response) => {
  const encryptedPayload = response.data?.payload;
  const { serverPublicKey } = await getSecurityMetadata();

  if (encryptedPayload && serverPublicKey) {
    try {
      response.data = decryptPayload(encryptedPayload, serverPublicKey);
    } catch (err: unknown) {
      console.error(err);
      return Promise.reject(
        new Error("Secure channel compromised or decryption failed"),
      );
    }
  }

  return response;
});

export default apiClient;
