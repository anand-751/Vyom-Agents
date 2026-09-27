/**
 * In-Memory Rate Limiter for Groq Model
 * Rule: If continuous 20 requests are sent within 2 minutes by a client,
 * the Groq model is locked for 15 seconds without showing any error or warning on the UI.
 */

interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
  lockedUntil: number | null;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const MAX_REQUESTS = 20;
const WINDOW_MS = 2 * 60 * 1000; // 2 minutes rolling window
const LOCKOUT_MS = 15 * 1000;     // 15 seconds lockout

export interface RateLimitStatus {
  isLimited: boolean;
  remainingSeconds?: number;
  remainingRequests?: number;
}

/**
 * Checks and records a request for the given client identifier (e.g. IP address).
 * Returns whether the Groq model is currently locked out for this client.
 */
export function checkGroqRateLimit(clientId: string): RateLimitStatus {
  const now = Date.now();
  let record = rateLimitStore.get(clientId);

  // If no record exists, initialize for this client
  if (!record) {
    record = {
      count: 1,
      firstRequestTime: now,
      lockedUntil: null,
    };
    rateLimitStore.set(clientId, record);
    return {
      isLimited: false,
      remainingRequests: MAX_REQUESTS - 1,
    };
  }

  // 1. Check if currently locked out
  if (record.lockedUntil !== null) {
    if (now < record.lockedUntil) {
      const remainingSeconds = Math.max(1, Math.ceil((record.lockedUntil - now) / 1000));
      return {
        isLimited: true,
        remainingSeconds,
      };
    } else {
      // 15-second lockout has expired; reset count and timestamps
      record.count = 1;
      record.firstRequestTime = now;
      record.lockedUntil = null;
      return {
        isLimited: false,
        remainingRequests: MAX_REQUESTS - 1,
      };
    }
  }

  // 2. Check if the 2-minute rolling window expired
  if (now - record.firstRequestTime > WINDOW_MS) {
    record.count = 1;
    record.firstRequestTime = now;
    return {
      isLimited: false,
      remainingRequests: MAX_REQUESTS - 1,
    };
  }

  // 3. Increment request count within the 2-minute window
  record.count++;

  // 4. If continuous requests reach 20 within 2 minutes:
  // Engage the 15-second lockout
  if (record.count >= MAX_REQUESTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    // Allow the 20th request through, then lock the subsequent requests for 15s
    if (record.count === MAX_REQUESTS) {
      return {
        isLimited: false,
        remainingRequests: 0,
      };
    }
    const remainingSeconds = Math.max(1, Math.ceil((record.lockedUntil - now) / 1000));
    return {
      isLimited: true,
      remainingSeconds,
    };
  }

  return {
    isLimited: false,
    remainingRequests: MAX_REQUESTS - record.count,
  };
}

/**
 * Helper to reset a client (useful for testing)
 */
export function resetRateLimit(clientId: string) {
  rateLimitStore.delete(clientId);
}
