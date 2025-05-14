import React from "react";

const products = [
  { name: "Bioderma", price: "$45.00 - $55.00", image: "/bioderma.png" },
  { name: "Chanca Piedra", price: "$30.00", image: "/chanca.png" },
  { name: "Umcka Cold Care", price: "$90.00", image: "/umcka.png" },
  // ...
];

export default function PopularProducts() {
  return (
    <section className="px-10 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Popular Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div key={i} className="bg-white shadow rounded p-4 text-center">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-contain"
            />
            <h3 className="mt-4 font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
