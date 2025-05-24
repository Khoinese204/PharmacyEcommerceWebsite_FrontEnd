import { Link } from "react-router-dom";

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="py-3 text-sm flex items-center">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {item.path && !isLast ? (
              <Link to={item.path} className="text-black hover:underline">
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? "text-blue-600 font-medium" : "text-black"}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">{">"}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
