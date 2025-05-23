import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "1", revenue: 2000000 },
  { day: "2", revenue: 5000000 },
  { day: "3", revenue: 10000000 },
  { day: "4", revenue: 3000000 },
  { day: "5", revenue: 8000000 },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis tickFormatter={(v) => `${v / 1000000}M`} />
        <Tooltip formatter={(value: number) => `${value.toLocaleString()}đ`} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
