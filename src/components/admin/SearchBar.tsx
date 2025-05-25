import React, { useState } from "react";

interface SearchBarProps {
  onSelect?: (item: string) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Lọc từ lịch sử nhập
    const results = history.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setFiltered([]);
    if (onSelect) onSelect(item);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;

    // Thêm vào lịch sử nếu chưa tồn tại
    if (!history.includes(query.trim())) {
      setHistory([query.trim(), ...history]);
    }

    setFiltered([]);
    if (onSelect) onSelect(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên người dùng, email"
        value={query}
        onChange={handleChange}
        className="w-200 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />

      {filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-md max-h-48 overflow-y-auto">
          {filtered.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-cyan-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
