import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type ProgressbarProps = {
  percentage: number;
};

export const Progressbar = ({ percentage }: ProgressbarProps) => {
  //   const percentage = 66;
  return (
    <div style={{ width: "48px", height: "48px" }}>
      <CircularProgressbar
        value={percentage}
        styles={buildStyles({
          pathColor: "#04AA61",
        })}
      />
    </div>
  );
};
