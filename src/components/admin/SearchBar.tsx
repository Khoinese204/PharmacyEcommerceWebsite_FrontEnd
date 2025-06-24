import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  value?: string; // ✅ Cho phép điều khiển từ bên ngoài
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // ✅ Điều khiển nhập liệu từ cha
  onSelect?: (item: string) => void;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChange,
  onSelect,
  placeholder,
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = value !== undefined ? value : internalQuery;

  const [history, setHistory] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (onChange) {
      onChange(e); // Gửi về component cha
    } else {
      setInternalQuery(val);
    }

    const results = history.filter((item) =>
      item.toLowerCase().includes(val.toLowerCase())
    );
    setFiltered(results);
  };

  const handleSelect = (item: string) => {
    if (onChange) {
      onChange({ target: { value: item } } as ChangeEvent<HTMLInputElement>);
    } else {
      setInternalQuery(item);
    }

    setFiltered([]);
    onSelect?.(item);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed === "") return;

    if (!history.includes(trimmed)) {
      setHistory([trimmed, ...history]);
    }

    setFiltered([]);
    onSelect?.(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
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
