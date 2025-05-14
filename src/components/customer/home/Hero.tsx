import React from "react";

export default function Hero() {
  return (
    <section
      className="relative text-white text-center py-32 bg-cover bg-center"
      style={{ backgroundImage: `url('/banner.jpg')` }}
    >
      <h2 className="text-2xl uppercase tracking-widest">
        Effective medicine, new modern way
      </h2>
      <h1 className="text-5xl font-bold mt-4">
        Welcome to{" "}
        <span className="text-green-300 text-center">Pharmarcy Website</span>
      </h1>
      <button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded hover:bg-teal-600">
        Shop Now
      </button>
    </section>
  );
}
