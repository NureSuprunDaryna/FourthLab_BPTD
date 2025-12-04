import {
  computeIntermediate,
  generatePrivateKey,
  generatePublicKey,
} from "./diffie-hellman.ts";

const N = 23n;
const g = 5n;

const a = generatePrivateKey(N);
const b = generatePrivateKey(N);
const c = generatePrivateKey(N);
const d = generatePrivateKey(N);
const e = generatePrivateKey(N);

console.log(
  "Private keys: a =",
  a,
  ", b =",
  b,
  ", c =",
  c,
  ", d =",
  d,
  ", e =",
  e
);
console.log();

const alice_r1 = generatePublicKey(g, a, N); // g^a mod N
const bob_r1 = generatePublicKey(g, b, N); // g^b mod N
const carol_r1 = generatePublicKey(g, c, N); // g^c mod N
const dave_r1 = generatePublicKey(g, d, N); // g^d mod N
const eve_r1 = generatePublicKey(g, e, N); // g^e mod N

console.log("РАУНД 1:");
console.log("Alice sends to Bob: g^a =", alice_r1);
console.log("Bob sends to Carol: g^b =", bob_r1);
console.log("Carol sends to Dave: g^c =", carol_r1);
console.log("Dave sends to Eve: g^d =", dave_r1);
console.log("Eve sends to Alice: g^e =", eve_r1);
console.log();

const bob_r2 = computeIntermediate(alice_r1, b, N); // g^(ab)
const carol_r2 = computeIntermediate(bob_r1, c, N); // g^(bc)
const dave_r2 = computeIntermediate(carol_r1, d, N); // g^(cd)
const eve_r2 = computeIntermediate(dave_r1, e, N); // g^(de)
const alice_r2 = computeIntermediate(eve_r1, a, N); // g^(ea)

console.log("РАУНД 2:");
console.log("Bob sends to Carol: g^(ab) =", bob_r2);
console.log("Carol sends to Dave: g^(bc) =", carol_r2);
console.log("Dave sends to Eve: g^(cd) =", dave_r2);
console.log("Eve sends to Alice: g^(de) =", eve_r2);
console.log("Alice sends to Bob: g^(ea) =", alice_r2);
console.log();

const carol_r3 = computeIntermediate(bob_r2, c, N); // g^(abc)
const dave_r3 = computeIntermediate(carol_r2, d, N); // g^(bcd)
const eve_r3 = computeIntermediate(dave_r2, e, N); // g^(cde)
const alice_r3 = computeIntermediate(eve_r2, a, N); // g^(dea)
const bob_r3 = computeIntermediate(alice_r2, b, N); // g^(eab)

console.log("РАУНД 3:");
console.log("Carol sends to Dave: g^(abc) =", carol_r3);
console.log("Dave sends to Eve: g^(bcd) =", dave_r3);
console.log("Eve sends to Alice: g^(cde) =", eve_r3);
console.log("Alice sends to Bob: g^(dea) =", alice_r3);
console.log("Bob sends to Carol: g^(eab) =", bob_r3);
console.log();

const dave_r4 = computeIntermediate(carol_r3, d, N); // g^(abcd)
const eve_r4 = computeIntermediate(dave_r3, e, N); // g^(bcde)
const alice_r4 = computeIntermediate(eve_r3, a, N); // g^(cdea)
const bob_r4 = computeIntermediate(alice_r3, b, N); // g^(deab)
const carol_r4 = computeIntermediate(bob_r3, c, N); // g^(eabc)

console.log("РАУНД 4:");
console.log("Dave sends to Eve: g^(abcd) =", dave_r4);
console.log("Eve sends to Alice: g^(bcde) =", eve_r4);
console.log("Alice sends to Bob: g^(cdea) =", alice_r4);
console.log("Bob sends to Carol: g^(deab) =", bob_r4);
console.log("Carol sends to Dave: g^(eabc) =", carol_r4);
console.log();

const sharedKey_Eve = computeIntermediate(dave_r4, e, N); // g^(abcde)
const sharedKey_Alice = computeIntermediate(eve_r4, a, N); // g^(abcde)
const sharedKey_Bob = computeIntermediate(alice_r4, b, N); // g^(abcde)
const sharedKey_Carol = computeIntermediate(bob_r4, c, N); // g^(abcde)
const sharedKey_Dave = computeIntermediate(carol_r4, d, N); // g^(abcde)

console.log("РАУНД 5 (Фінальні спільні ключі):");
console.log("Alice: g^(abcde) =", sharedKey_Alice);
console.log("Bob: g^(abcde) =", sharedKey_Bob);
console.log("Carol: g^(abcde) =", sharedKey_Carol);
console.log("Dave: g^(abcde) =", sharedKey_Dave);
console.log("Eve: g^(abcde) =", sharedKey_Eve);
console.log();
console.log(
  "All keys equal?",
  sharedKey_Alice === sharedKey_Bob &&
    sharedKey_Bob === sharedKey_Carol &&
    sharedKey_Carol === sharedKey_Dave &&
    sharedKey_Dave === sharedKey_Eve
);
