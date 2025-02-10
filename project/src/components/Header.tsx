/**
 * Header Component
 * 
 * This component displays the header section for the Earnings Calendar.
 * It includes:
 * - A title for the earnings display.
 * - A dynamically calculated start date (Monday of the current week).
 * - A loading indicator when data is being fetched.
 * - An error message with a retry button if an error occurs.
 **/

import React, { useMemo } from "react";

interface HeaderProps {
  loading: boolean;
  error: string | null;
}

const getMondayDate = (): string => {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  return monday.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const Header: React.FC<HeaderProps> = ({ loading, error }) => {
  const weekStartDate = useMemo(() => getMondayDate(), []);

  return (
    <header className="w-full flex flex-col items-center mb-6">
      <div className="w-full flex justify-between items-center">
        <div className="text-left pl-4 ml-10">
          <h2 className="text-2xl font-bold text-black">EARNINGS BENZINGA</h2>
        </div>
        <div className="w-full flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-black">Most Anticipated Earnings Releases</h1>
          <p className="text-xs text-black">For the week beginning</p>
          <p className="text-2xl font-semibold text-black">{weekStartDate}</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      )}

      {error && (
        <div className="text-xl text-red-600 bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Retry
          </button>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
