export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://datahubgh.onrender.com";
if (typeof window !== "undefined") {
  console.log("🚀 [DataHubGH] Target API URL:", API_URL);
}
