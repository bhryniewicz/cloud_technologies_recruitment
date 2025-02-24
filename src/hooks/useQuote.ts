import { useQuery } from "@tanstack/react-query";

export const useQuote = () => {
  const apiKey = import.meta.env.VITE_NINJAS_API_KEY ?? "";

  const options: RequestInit = {
    method: "GET",
    headers: { "x-api-key": apiKey },
  };

  const url = "https://api.api-ninjas.com/v1/quotes";

  const { data, error, isLoading } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      return response.json();
    },
  });

  return { data, error, isLoading };
};
