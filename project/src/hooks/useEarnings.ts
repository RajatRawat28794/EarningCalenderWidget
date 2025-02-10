/**
 * useEarnings Custom Hook
 * 
 * This hook fetches earnings data and corresponding company logos, handling loading and error states.
 **/
import { useEffect, useState } from "react";
import { fetchEarnings, fetchLogos } from "../api/api";

export const useEarnings = () => {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [logos, setLogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { earnings: earningsData, tickers } = await fetchEarnings();
        const logosData = await fetchLogos(tickers);
        setEarnings(earningsData);
        setLogos(logosData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { earnings, logos, loading, error };
};
