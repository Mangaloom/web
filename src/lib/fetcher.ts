export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetcher = async <T>(routeApi: string): Promise<T> => {
  const res = await fetch(`${API_URL}${routeApi}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
