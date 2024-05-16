import React from "react";
import { DayStats } from "./DayStats";

export const DayStatsContainer = ({ day, stats }) => {
  return (
    <div>
      <p>{day}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "20%" }}>
        {stats.map(stat => (
          <DayStats key={stats.id} stats={stat} />
        ))}
      </div>
    </div>
  );
};
