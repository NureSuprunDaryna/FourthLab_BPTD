import CryptoJS from "crypto-js";

export function deriveAESKey(sharedKey: bigint): string {
  return CryptoJS.SHA256(sharedKey.toString()).toString();
}

export function encryptAES(message: string, aesKey: string): string {
  return CryptoJS.AES.encrypt(message, aesKey).toString();
}

export function decryptAES(cipherText: string, aesKey: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, aesKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
