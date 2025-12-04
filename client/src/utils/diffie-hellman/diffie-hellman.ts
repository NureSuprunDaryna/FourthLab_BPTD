export function generatePrivateKey(p: bigint): bigint {
  const rand = BigInt(Math.floor(Math.random() * Number(p - 2n))) + 2n;
  return rand;
}

export function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  let b = base % mod;
  let e = exp;

  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod;
    e >>= 1n;
    b = (b * b) % mod;
  }
  return result;
}

export function generatePublicKey(
  g: bigint,
  privateKey: bigint,
  p: bigint
): bigint {
  return modPow(g, privateKey, p);
}

export function computeIntermediate(
  receivedValue: bigint,
  privateKey: bigint,
  p: bigint
): bigint {
  return modPow(receivedValue, privateKey, p);
}
