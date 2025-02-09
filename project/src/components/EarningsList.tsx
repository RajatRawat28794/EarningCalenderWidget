import React, { useMemo, memo } from "react";
import Logo from "./Logo";

interface EarningsListProps {
  earnings: any[];
  logos: any[];
}

const EarningsList: React.FC<EarningsListProps> = ({ earnings, logos }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const earningsByDay = useMemo(() => {
    return earnings.reduce((acc, e) => {
      const day = new Date(e.updated * 1000).toLocaleString("en-IN", { weekday: "long" });
      if (acc[day]) acc[day].push(e);
      return acc;
    }, { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] } as Record<string, any[]>);
  }, [earnings]);

  const logoMap = useMemo(() => {
    return logos.reduce((acc, logo) => {
      acc[logo.search_key.toUpperCase()] = logo.files?.mark_vector_light || "";
      return acc;
    }, {} as Record<string, string>);
  }, [logos]);

  const DayEarnings = memo(({ day, earnings, logoMap }: { day: string; earnings: any[]; logoMap: Record<string, string> }) => {
    return (
      <div className="p-3">
        <h2 className="text-xl font-bold text-center mb-2">{day}</h2>
        <div
          className="bg-white p-3 border border-black min-h-[500px] min-w-[290px] w-full overflow-y-hidden"
          style={{
            height: "500px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overscrollBehavior: "contain",
            willChange: "transform",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.overflowY = "auto")}
          onMouseLeave={(e) => (e.currentTarget.style.overflowY = "hidden")}
        >
          {earnings.map((earning, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <a href={`https://www.benzinga.com/quote/${earning.ticker}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <p className="text-xs text-gray-600">{earning.ticker}</p>
                <Logo src={logoMap[earning.ticker.toUpperCase()] || "/placeholder.svg"} alt={earning.ticker} />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  });

  
  return (
    <div className="grid grid-cols-5 gap-4">
      {days.map((day) => (
        <DayEarnings key={day} day={day} earnings={earningsByDay[day]} logoMap={logoMap} />
      ))}
    </div>
  );
};

export default EarningsList;
