import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  DotProps,
  ReferenceDot,
} from "recharts";

// Dữ liệu mẫu 31 ngày (bạn có thể thay thế bằng dữ liệu thực từ backend)
const data = [
  { day: 1, revenue: 1_000_000 },
  { day: 2, revenue: 2_000_000 },
  { day: 3, revenue: 3_000_000 },
  { day: 4, revenue: 2_500_000 },
  { day: 5, revenue: 6_800_000 },
  { day: 6, revenue: 6_200_000 },
  { day: 7, revenue: 4_200_000 },
  { day: 8, revenue: 7_500_000 },
  { day: 9, revenue: 3_000_000 },
  { day: 10, revenue: 5_500_000 },
  { day: 11, revenue: 2_500_000 },
  { day: 12, revenue: 5_000_000 },
  { day: 13, revenue: 6_800_000 },
  { day: 14, revenue: 5_700_000 },
  { day: 15, revenue: 16_500_000 }, // Peak
  { day: 16, revenue: 4_000_000 },
  { day: 17, revenue: 7_000_000 },
  { day: 18, revenue: 8_200_000 },
  { day: 19, revenue: 6_800_000 },
  { day: 20, revenue: 5_000_000 },
  { day: 21, revenue: 6_800_000 },
  { day: 22, revenue: 6_000_000 },
  { day: 23, revenue: 7_000_000 },
  { day: 24, revenue: 5_000_000 },
  { day: 25, revenue: 8_000_000 },
  { day: 26, revenue: 6_200_000 },
  { day: 27, revenue: 7_000_000 },
  { day: 28, revenue: 7_500_000 },
  { day: 29, revenue: 9_000_000 },
  { day: 30, revenue: 4_000_000 },
  { day: 31, revenue: 1_000_000 },
];

export default function Chart() {
  return (
    <div className="w-full overflow-hidden">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" interval={1} />
          <YAxis
            tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const value = payload[0].value as number;
                return (
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shadow">
                    {new Intl.NumberFormat("vi-VN").format(value)}
                  </div>
                );
              }
              return null;
            }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="revenue"
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
