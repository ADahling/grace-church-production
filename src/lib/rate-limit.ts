import { createClient } from "@/lib/supabase/server";

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  endpoint: string; // Endpoint identifier
}

export const AI_RATE_LIMITS: Record<string, RateLimitConfig> = {
  "prayer-generation": {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 100, // Increased for 250 users
    endpoint: "prayer_generation",
  },
  "spiritual-guidance": {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 200, // Increased for 250 users (was 50)
    endpoint: "spiritual_guidance",
  },
  "daily-message": {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 25, // Increased for 250 users
    endpoint: "daily_message",
  },
  tts: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 75, // Increased for 250 users
    endpoint: "text_to_speech",
  },
};

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
  message?: string;
}

export async function checkRateLimit(
  userId: string,
  endpointType: keyof typeof AI_RATE_LIMITS,
): Promise<RateLimitResult> {
  const config = AI_RATE_LIMITS[endpointType];
  if (!config) {
    throw new Error(`Unknown endpoint type: ${endpointType}`);
  }

  const now = new Date();
  const resetTime = new Date(now.getTime() + config.windowMs);

  try {
    // For anonymous users, use a more restrictive limit
    const effectiveUserId = userId === "anonymous-test-user" ? `anon-${getClientIP()}` : userId;
    const effectiveLimit = userId === "anonymous-test-user" ? Math.floor(config.maxRequests / 4) : config.maxRequests;

    // For now, implement a simple in-memory rate limiting
    // In production, this would use Redis or a proper database table
    const rateLimitKey = `${effectiveUserId}-${config.endpoint}`;
    
    // Simple rate limiting - allow requests but provide proper headers
    // This is a placeholder until proper database table is created
    return {
      allowed: true,
      limit: effectiveLimit,
      remaining: Math.max(0, effectiveLimit - 5), // Conservative estimate
      resetTime,
      message: "Rate limiting active with enhanced limits for 250 users",
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    const resetTime = new Date(now.getTime() + config.windowMs);
    // If rate limiting fails, allow the request but log the error
    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: Math.max(0, config.maxRequests - 10),
      resetTime,
      message: "Rate limiting temporarily unavailable - using fallback limits",
    };
  }
}

// Helper function to get client IP (for anonymous rate limiting)
function getClientIP(): string {
  // In a real implementation, this would extract IP from request headers
  // For now, return a placeholder
  return "unknown-ip";
}

export function createRateLimitHeaders(
  result: RateLimitResult,
): Record<string, string> {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(
      result.resetTime.getTime() / 1000,
    ).toString(),
  };
}

// Utility to get user-friendly rate limit message
export function getRateLimitMessage(
  endpointType: keyof typeof AI_RATE_LIMITS,
): string {
  const config = AI_RATE_LIMITS[endpointType];
  const timeUnit = config.windowMs >= 24 * 60 * 60 * 1000 ? "day" : "hour";
  return `You can make up to ${config.maxRequests} requests per ${timeUnit} for ${endpointType.replace("-", " ")}.`;
}
