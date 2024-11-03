import {
  Cell,
  Legend,
  Pie,
  PieChart as PieChartComponent,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PaymentBehaviouralDataProps = {
  behaviouralData: { name: string; value: number; color: string }[];
};
export const PieChart = ({ behaviouralData }: PaymentBehaviouralDataProps) => {
  return (
    <ResponsiveContainer width="100%">
      <PieChartComponent>
        <Pie
          data={behaviouralData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={80}
          strokeWidth={0}
          // cx="50%"
          // cy="50%"
        >
          {behaviouralData.map((entry, index) => (
            // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          style={{ top: "30px" }}
          verticalAlign="middle"
          align="right"
          layout="vertical"
          payload={behaviouralData}
          content={<CustomizedLengend />}
        />
      </PieChartComponent>
    </ResponsiveContainer>
  );
};
function CustomizedLengend(props: any) {
  const { payload } = props;
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        // position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)", // Center the legend vertically
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          style={{
            borderLeft: `1px solid ${entry.color}`,
            padding: "0.5rem",
          }}
          key={`item-${index}`}
        >
          <span>{entry.name}</span>
          <div>{entry.value}%</div>
        </li>
      ))}
    </ul>
  );
  // return (
  //   <ul
  //     style={{
  //       display: "flex",
  //       padding: 0,
  //       margin: 0,
  //       overflow: "hidden",
  //       flexDirection: "column",
  //       top: "-89px",
  //       gap: "4px",
  //     }}
  //   >
  //     {payload.map((entry: string | any, index: number) => (
  //       <li
  //         style={{
  //           borderLeft: `1px solid ${entry.color}`,
  //           padding: "0.5rem",
  //           // marginTop: "-20px",
  //         }}
  //         key={`item-${index}`}
  //       >
  //         <span>{entry.name}</span>
  //         <div>{entry.value}%</div>
  //       </li>
  //     ))}
  //   </ul>
  // );
}
