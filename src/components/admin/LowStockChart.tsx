import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

// const data = [
//   { name: "A", quantity: 10 },
//   { name: "B", quantity: 15 },
//   { name: "C", quantity: 7 },
//   { name: "D", quantity: 14 },
//   { name: "E", quantity: 3 },
// ];

type LowStockChartProps = {
  data: { name: string; quantity: number }[];
};

export default function LowStockChart({ data }: LowStockChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 20]} />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
            tickFormatter={(value) =>
              value.length > 30 ? value.substring(0, 27) + "..." : value
            }
          />
          <Tooltip />
          <Bar dataKey="quantity" fill="#3b82f6" radius={[0, 4, 4, 0]}>
            <LabelList
              dataKey="quantity"
              position="right"
              fill="#000"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
