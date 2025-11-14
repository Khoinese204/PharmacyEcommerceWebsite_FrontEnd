// src/components/warehouse/ExpiryDonutChart.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Định nghĩa màu sắc
const COLORS = [
  "#DC2626", // Đỏ (Hết hạn)
  "#F59E0B", // Cam (Sắp hết hạn)
  "#10B981", // Xanh (An toàn)
];

// Định nghĩa props cho component
interface ExpiryDonutChartProps {
  expired: number;
  nearExpiry: number;
  safe: number;
}

export default function ExpiryDonutChart({
  expired,
  nearExpiry,
  safe,
}: ExpiryDonutChartProps) {
  // Định dạng dữ liệu cho biểu đồ
  const chartData = [
    { name: "Đã hết hạn", value: expired },
    { name: "Sắp hết hạn", value: nearExpiry },
    { name: "An toàn", value: safe },
  ];

  return (
    // ResponsiveContainer giúp biểu đồ vừa vặn với container
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value" // Lấy giá trị từ key 'value'
          nameKey="name" // Lấy tên từ key 'name'
          cx="50%" // Căn giữa theo chiều ngang
          cy="50%" // Căn giữa theo chiều dọc
          outerRadius={80} // Bán kính ngoài
          fill="#8884d8"
        >
          {/* Tô màu cho từng lát bánh */}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Tooltip khi di chuột vào */}
        <Tooltip />
        {/* Chú thích (Legend) */}
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
