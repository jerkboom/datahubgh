export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
if (typeof window !== "undefined") {
  console.log("🚀 [DataHubGH] Target API URL:", API_URL);
}
