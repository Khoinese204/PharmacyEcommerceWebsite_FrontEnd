// src/components/Breadcrumbs.tsx
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbTo({ items }: BreadcrumbsProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-cyan-100 text-sm p-4">
      <div className="max-w-6xl mx-auto text-left">
        {items.map((item, index) => (
          <span key={index} className="text-gray-700">
            <span
              onClick={() => navigate(item.path)}
              className="inline-block px-2 py-1 cursor-pointer rounded hover:bg-gray-200 hover:font-semibold transition"
            >
              {item.label}
            </span>
            {index < items.length - 1 && (
              <span className="text-gray-500"> &gt; </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
