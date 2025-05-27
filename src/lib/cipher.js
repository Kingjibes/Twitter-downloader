const CIPHER_KEY = "HACKERPROIMGURLGENERATORKEY"; // Needs to be consistent

// Simple character substitution cipher (Caesar-like, but with a key string)
// This is NOT cryptographically secure. For demonstration purposes only.
function applyCipher(text, key, encrypt = true) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        let newCharCode;

        if (encrypt) {
            newCharCode = charCode + keyChar;
        } else {
            newCharCode = charCode - keyChar;
        }
        // To keep it within printable ASCII range (32-126) for URL safety, we might need more complex logic
        // For this demo, we'll assume the short codes (alphanumeric) won't go out of reasonable bounds easily
        // or we can use base64 encoding after encryption.
        // For simplicity here, we just add/subtract. For URLs, Base64 is better.
        result += String.fromCharCode(newCharCode);
    }
    // For URL safety, convert to Base64
    if (encrypt) {
      return btoa(result).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // URL-safe Base64
    } else {
      return result; // Decryption path for base64 needs atob first
    }
}

export function simpleCipher(plainText) {
    return applyCipher(plainText, CIPHER_KEY, true);
}

export function simpleDecipher(cipherText) {
    try {
      // URL-safe Base64 decode
      let base64 = cipherText.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      const decodedFromBase64 = atob(base64);
      return applyCipher(decodedFromBase64, CIPHER_KEY, false);
    } catch (e) {
      console.error("Decipher error:", e);
      // This can happen if the input is not valid Base64 or not correctly ciphered.
      return null; // Or throw an error
    }
}