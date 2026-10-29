export const readJsonResponse = async (response) => {
  const body = await response.text();
  if (!body.trim()) return {};

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Payment API is unavailable. Start the app with `npm run dev:vercel`.");
  }
};
