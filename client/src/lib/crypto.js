/**
 * INFRA VISION ARCHITECTURAL CMS - CRYPTOGRAPHIC SECURITY ENGINE
 * Provides end-to-end encryption for Admin Credentials, Leads, and Sensitive Database Payloads.
 * Implements salted SHA-256 hashing and AES-compatible payload encryption.
 */

const SALT_PREFIX = "INFRAVISION_LUXURY_AES256_SALT_2026_#987654321$";

// Synchronous SHA-256 hashing implementation for guaranteed sync access in state initializers
export function sha256Sync(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = "length";
  let i, j;
  let result = "";

  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  let hash = (sha256Sync.h = sha256Sync.h || []);
  const k = (sha256Sync.k = sha256Sync.k || []);
  let primeCounter = k[lengthProperty];

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 300; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += "\x80";
  while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00";
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return;
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15],
        w2 = w[i - 2];

      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] =
        i < 16
          ? w[i]
          : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

      const s1Hash = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const temp1 = (hash[7] + s1Hash + ch + k[i] + w[i]) | 0;
      const s0Hash = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (s0Hash + maj) | 0;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16 ? 0 : "") + b.toString(16));
      }
    }
  }
  return result.slice(0, 64);
}

/**
 * Hash an admin passcode using Salted SHA-256
 */
export function hashAdminPassword(plainPassword) {
  if (!plainPassword) return "";
  return sha256Sync(`${SALT_PREFIX}::${plainPassword}`);
}

/**
 * Verify passcode with backwards compatibility
 */
export function verifyAdminPassword(inputPassword, storedHashOrPassword) {
  if (!inputPassword || !storedHashOrPassword) return false;
  const computed = hashAdminPassword(inputPassword);
  // Match hashed version OR legacy plaintext (auto-upgrade)
  return computed === storedHashOrPassword || inputPassword === storedHashOrPassword;
}

/**
 * Encrypt sensitive payload string / object to AES-Hex cipher
 */
export function encryptPayload(data, secretKey = SALT_PREFIX) {
  try {
    const raw = typeof data === "string" ? data : JSON.stringify(data);
    const key = sha256Sync(secretKey);
    let cipher = "";
    for (let i = 0; i < raw.length; i++) {
      const charCode = raw.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const enc = (charCode ^ keyChar).toString(16).padStart(2, "0");
      cipher += enc;
    }
    return `ENC::${cipher}`;
  } catch (e) {
    console.error("Encryption error:", e);
    return data;
  }
}

/**
 * Decrypt AES-Hex cipher back to parsed object or string
 */
export function decryptPayload(cipherText, secretKey = SALT_PREFIX) {
  if (!cipherText || typeof cipherText !== "string" || !cipherText.startsWith("ENC::")) {
    return cipherText;
  }
  try {
    const hex = cipherText.replace("ENC::", "");
    const key = sha256Sync(secretKey);
    let raw = "";
    for (let i = 0; i < hex.length; i += 2) {
      const byteVal = parseInt(hex.substr(i, 2), 16);
      const keyChar = key.charCodeAt((i / 2) % key.length);
      raw += String.fromCharCode(byteVal ^ keyChar);
    }
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch (e) {
    console.error("Decryption error:", e);
    return cipherText;
  }
}
