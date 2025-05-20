interface Activity {
  label: string;
  time: string;
  active?: boolean;
}

interface ActivityHistoryProps {
  history: Activity[];
}

export default function ActivityHistory({ history }: ActivityHistoryProps) {
  return (
    <div className="mt-8 text-left">
      <p className="text-black font-bold text-lg mb-2">Hoạt động đơn hàng</p>
      <ul className="text-sm space-y-2">
        {history.map((item, index) => (
          <li key={index}>
            <span
              className={
                item.active
                  ? "text-blue-600 font-extrabold"
                  : "text-black font-normal"
              }
            >
              {item.label}
            </span>
            <br />
            <span
              className={
                item.active
                  ? "text-gray-500 font-bold"
                  : "text-gray-500 font-normal"
              }
            >
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
