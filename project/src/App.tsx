import React from "react";
import EarningsList from "./components/EarningsList";
import { useEarnings } from "./hooks/useEarnings";
import Header  from "./components/Header";
const App: React.FC = () => {
  const { earnings, logos } = useEarnings();
    
    
  return (
  <div className="min-h-screen bg-[#c5a58a] p-6 flex flex-col items-center">
      <Header loading={false} error={null} />
      <EarningsList earnings={earnings} logos={logos} />
    </div>
  );
};

export default App;
