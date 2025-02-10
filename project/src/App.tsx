/**
 * App Component
 * 
 * This is the main application component for the Earnings Calendar Widget.
 * It fetches earnings and logo data using the `useEarnings` hook and displays them using child components.
 **/
import React from "react";
import EarningsList from "./components/EarningsList";
import { useEarnings } from "./hooks/useEarnings";
import Header from "./components/Header";

const App: React.FC = () => {
  const { earnings, logos, loading, error } = useEarnings();

  return (
    <div className="min-h-screen bg-[#c5a58a] p-6 flex flex-col items-center">
      <Header loading={loading} error={error} />
      
      {loading && <p className="text-blue-500">Loading earnings data...</p>}
      
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && earnings.length === 0 && (
        <p className="text-gray-600">No earnings data available.</p>
      )}

      {!loading && !error && <EarningsList earnings={earnings} logos={logos} />}
    </div>
  );
};

export default App;
