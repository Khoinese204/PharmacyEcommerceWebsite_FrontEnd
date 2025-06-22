import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// const data = [
//   { day: 1, customers: 8 },
//   { day: 2, customers: 11 },
//   { day: 3, customers: 15 },
//   { day: 4, customers: 22 },
//   { day: 5, customers: 34 },
//   { day: 6, customers: 31 },
//   { day: 7, customers: 28 },
//   { day: 8, customers: 35 },
//   { day: 9, customers: 17 },
//   { day: 10, customers: 14 },
//   { day: 11, customers: 21 },
//   { day: 12, customers: 27 },
//   { day: 13, customers: 30 },
//   { day: 14, customers: 26 },
//   { day: 15, customers: 83 }, // peak
//   { day: 16, customers: 19 },
//   { day: 17, customers: 34 },
//   { day: 18, customers: 38 },
//   { day: 19, customers: 33 },
//   { day: 20, customers: 29 },
//   { day: 21, customers: 31 },
//   { day: 22, customers: 27 },
//   { day: 23, customers: 25 },
//   { day: 24, customers: 30 },
//   { day: 25, customers: 35 },
//   { day: 26, customers: 37 },
//   { day: 27, customers: 42 },
//   { day: 28, customers: 45 },
//   { day: 29, customers: 49 },
//   { day: 30, customers: 16 },
//   { day: 31, customers: 5 },
// ];

type CustomerChartProps = {
  data: { day: number; customers: number }[];
};

export default function CustomerChart({ data }: CustomerChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" interval={1} />
          <YAxis />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const value = payload[0].value as number;
                return (
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shadow">
                    {value}
                  </div>
                );
              }
              return null;
            }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{
              r: 6,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#ffffff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
