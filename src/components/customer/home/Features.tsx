import React from "react";

const features = [
  { title: "Free Shipping", desc: "Lorem ipsum...", color: "bg-cyan-400" },
  {
    title: "Season Sale 50% Off",
    desc: "Lorem ipsum...",
    color: "bg-green-400",
  },
  { title: "Buy A Gift Card", desc: "Lorem ipsum...", color: "bg-yellow-400" },
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 py-8">
      {features.map((f, i) => (
        <div key={i} className={`${f.color} p-6 text-white rounded`}>
          <h3 className="text-xl font-bold mb-2">{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
