import axios from "axios";

const API_KEY = "f090a778d74f4450a11ad417ad72740c";

// Fetch earnings data
export const fetchEarnings = async () => {
  try {
    const url = `https://api.benzinga.com/api/v2.1/calendar/earnings?token=${API_KEY}`;
    const response = await axios.get(url);

    if (!response.data || !Array.isArray(response.data.earnings)) {
      throw new Error("Invalid earnings data format");
    }

    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const recentEarnings = response.data.earnings.filter((item: any) => {
      const updatedTimestamp = new Date(item.updated * 1000);
      return updatedTimestamp >= threeMonthsAgo && updatedTimestamp <= currentDate;
    });

    const tickers: string[] = Array.from(
      new Set(
        recentEarnings
          .map((item: { ticker?: string }) => item.ticker || "") // Default to empty string if undefined
          .filter((ticker: string): ticker is string => typeof ticker === "string" && ticker.trim().length > 0) // Type guard
      )
    );

    return { earnings: recentEarnings, tickers };
  } catch (error) {
    console.error("Error fetching earnings:", error);
    return { earnings: [], tickers: [] };
  }
};

// Fetch logos
export const fetchLogos = async (tickers: string[]) => {
  try {
    if (!tickers.length) return [];

    const url = `https://api.benzinga.com/api/v2/logos/search?token=${API_KEY}&search_keys_type=symbol&fields=mark_vector_light&search_keys=${tickers.join(",")}`;
    const response = await axios.get(url);

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching logos:", error);
    return [];
  }
};
