export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetcher = async <T>(routeApi: string): Promise<T> => {
  const res = await fetch(`${API_URL}${routeApi}`, {
    next: { revalidate: 60 },
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  });
  if (!res.ok) {
    const errorMessage = `Failed to fetch data: ${res.status} ${res.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return res.json();
};
