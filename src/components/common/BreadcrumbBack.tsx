import { useNavigate } from "react-router-dom";

export default function BreadcrumbBack({ content, pageTo }) {
  const navigate = useNavigate();
  return (
    <div className="bg-cyan-100 text-sm p-4">
      <div className="max-w-6xl mx-auto text-left">
        <span className="text-gray-700">&lt;</span>{" "}
        <span
          onClick={() => navigate(pageTo)}
          className="inline-block px-2 py-1 text-gray-700 cursor-pointer rounded hover:bg-gray-200 hover:font-semibold transition"
        >
          {content}
        </span>
      </div>
    </div>
  );
}

// text-gray-700
