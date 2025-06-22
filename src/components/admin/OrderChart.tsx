import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { day: 1, orders: 5 },
//   { day: 2, orders: 10 },
//   { day: 3, orders: 14 },
//   { day: 4, orders: 11 },
//   { day: 5, orders: 60 },
//   { day: 6, orders: 55 },
//   { day: 7, orders: 40 },
//   { day: 8, orders: 70 },
//   { day: 9, orders: 30 },
//   { day: 10, orders: 50 },
//   { day: 11, orders: 25 },
//   { day: 12, orders: 45 },
//   { day: 13, orders: 60 },
//   { day: 14, orders: 50 },
//   { day: 15, orders: 180 }, // peak
//   { day: 16, orders: 40 },
//   { day: 17, orders: 70 },
//   { day: 18, orders: 85 },
//   { day: 19, orders: 60 },
//   { day: 20, orders: 50 },
//   { day: 21, orders: 70 },
//   { day: 22, orders: 65 },
//   { day: 23, orders: 75 },
//   { day: 24, orders: 55 },
//   { day: 25, orders: 90 },
//   { day: 26, orders: 65 },
//   { day: 27, orders: 80 },
//   { day: 28, orders: 85 },
//   { day: 29, orders: 95 },
//   { day: 30, orders: 45 },
//   { day: 31, orders: 20 },
// ];

type OrdersChartProps = {
  data: { day: number; orders: number }[];
};

export default function OrdersChart({ data }: OrdersChartProps) {
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
