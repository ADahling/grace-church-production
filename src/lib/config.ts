export const config = {
  supabase: {
    url:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://cuijuolyvcocoplnfouu.supabase.co",
    anonKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1aWp1b2x5dmNvY29wbG5mb3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzI3NDgsImV4cCI6MjA2NDc0ODc0OH0.k4SGu3w7Ez3bJasBGTiySJMDRgQ-CYY7aoXnmZTNWg8",
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
  },
};

// Validation
export function validateConfig(): void {
  if (!config.supabase.url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
  }
  if (!config.supabase.anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
  }
  if (!config.openai.apiKey) {
    console.warn("OPENAI_API_KEY is not set - AI features will be disabled");
  }
}
