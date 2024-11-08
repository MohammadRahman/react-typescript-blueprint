import { DayStats } from "./DayStats";

interface DayStatsContainerProps{
  day: string;
  stats: {
    id: number;
    color?: string;
    jobType: string;
    quantity: number; }[]
}
export const DayStatsContainer = ({ day, stats }:DayStatsContainerProps ) => {
  console.log("Stats from DayContainer",stats)
  return (
    <div>
      <p>{day}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "20%" }}>
        {stats.map(stat => (
          <DayStats key={stat.id} stats={stat} />
        ))}
      </div>
    </div>
  );
};
