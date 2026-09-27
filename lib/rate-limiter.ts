/**
 * In-Memory Rate Limiter for Groq Model
 * Rule: If 10 requests are sent to the Groq model by a client,
 * stop taking requests for the next 15 minutes.
 */

interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
  lockedUntil: number | null;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const MAX_REQUESTS = 10;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes rolling window

export interface RateLimitStatus {
  isLimited: boolean;
  remainingMinutes?: number;
  remainingRequests?: number;
  message?: string;
}

/**
 * Checks and records a request for the given client identifier (e.g. IP address).
 * Returns whether the request is rate-limited and the remaining lockout minutes.
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
      const remainingMinutes = Math.max(1, Math.ceil((record.lockedUntil - now) / 60000));
      return {
        isLimited: true,
        remainingMinutes,
        message: `You've reached the message limit (10 requests). Our AI assistant is taking a short breather to ensure fast and fair access for everyone. Please try again in about ${remainingMinutes} minute${remainingMinutes === 1 ? "" : "s"}, or feel free to book a direct consultation with our team!`,
      };
    } else {
      // Lockout period has expired; reset record
      record.count = 1;
      record.firstRequestTime = now;
      record.lockedUntil = null;
      return {
        isLimited: false,
        remainingRequests: MAX_REQUESTS - 1,
      };
    }
  }

  // 2. Check if rolling window expired
  if (now - record.firstRequestTime > WINDOW_MS) {
    record.count = 1;
    record.firstRequestTime = now;
    return {
      isLimited: false,
      remainingRequests: MAX_REQUESTS - 1,
    };
  }

  // 3. Increment request count
  record.count++;

  // 4. If limit exceeded (more than 10 continuous requests), activate 15-minute lockout
  if (record.count > MAX_REQUESTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    const remainingMinutes = 15;
    return {
      isLimited: true,
      remainingMinutes,
      message: `You've reached the message limit (10 requests). Our AI assistant is taking a short breather to ensure fast and fair access for everyone. Please try again in about ${remainingMinutes} minutes, or feel free to book a direct consultation with our team!`,
    };
  }

  return {
    isLimited: false,
    remainingRequests: MAX_REQUESTS - record.count,
  };
}

/**
 * Helper to reset a client (useful for unit testing)
 */
export function resetRateLimit(clientId: string) {
  rateLimitStore.delete(clientId);
}
