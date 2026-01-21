import nacl from "tweetnacl";
import {
  decodeBase64,
  encodeBase64,
  encodeUTF8,
  decodeUTF8,
} from "tweetnacl-util";

export const clientKeys = nacl.box.keyPair();

export const encryptPayload = (data: unknown, serverPubKeyB64: string) => {
  const nonce = nacl.randomBytes(24);
  const messageUint8 = decodeUTF8(JSON.stringify(data));
  const serverPubKeyUint8 = decodeBase64(serverPubKeyB64);

  const encrypted = nacl.box(
    messageUint8,
    nonce,
    serverPubKeyUint8,
    clientKeys.secretKey,
  );

  const fullPayload = new Uint8Array(nonce.length + encrypted.length);
  fullPayload.set(nonce);
  fullPayload.set(encrypted, nonce.length);

  return encodeBase64(fullPayload);
};

export const decryptPayload = (payloadB64: string, serverPubKeyB64: string) => {
  const fullData = decodeBase64(payloadB64);
  const serverPubKey = decodeBase64(serverPubKeyB64);

  const nonce = fullData.slice(0, 24);
  const ciphertext = fullData.slice(24);

  const decryptedUint8 = nacl.box.open(
    ciphertext,
    nonce,
    serverPubKey,
    clientKeys.secretKey,
  );
  if (!decryptedUint8) throw new Error("Decryption failed");

  return JSON.parse(encodeUTF8(decryptedUint8));
};
