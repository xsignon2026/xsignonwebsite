// Reads a signing secret and refuses to run without one. There is no built-in fallback: a secret that
// lives in the repository is a secret everyone has. Tests get a fixed value so they stay repeatable.
export function requireSecret(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value && value.length >= 32) return value;
  }
  if (process.env.NODE_ENV === "test") return "test-only-secret-not-for-production-use";
  throw new Error(`Missing secret: set ${names[0]} to at least 32 random characters.`);
}
