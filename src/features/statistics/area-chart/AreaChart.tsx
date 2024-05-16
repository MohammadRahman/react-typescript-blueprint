"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const weeklyData = [
  {
    name: "Sun",
    unpaidInvoices: 3,
    // product2: 2400,
  },
  {
    name: "Mon",
    unpaidInvoices: 5,
    // product2: 2210,
  },
  {
    name: "Tue",
    unpaidInvoices: 12,
    // product2: 2290,
  },
  {
    name: "Wed",
    unpaidInvoices: 3,
    // product2: 2000,
  },
  {
    name: "Thu",
    unpaidInvoices: 16,
    // product2: 2181,
  },
  {
    name: "Fri",
    unpaidInvoices: 8,
    // product2: 2500,
  },
  {
    name: "Sat",
    unpaidInvoices: 8,
  },
];

export const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={weeklyData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="1 1" />
        <YAxis axisLine={false} tickLine={false} tickCount={6} tickMargin={8} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
        <Area
          type="monotone"
          dataKey="unpaidInvoices"
          stroke="#04AA61"
          fillOpacity={1}
          fill="url(#colorPv)"
          stackId="1"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
//         <p className="text-medium text-lg">{label}</p>
//         <p className="text-sm text-blue-400">
//           Product 1:
//           <span className="ml-2">${payload[0].value}</span>
//         </p>
//         <p className="text-sm text-indigo-400">
//           Product 2:
//           <span className="ml-2">${payload[1].value}</span>
//         </p>
//       </div>
//     );
//   }
// };

export default AreaChartComponent;
