import React from "react";
import Navbar from "../../components/common/Navbar";
import Features from "../../components/customer/home/Features";
import PopularProducts from "../../components/customer/home/PopularProducts";
import Hero from "../../components/customer/home/Hero";

export default function Page() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <PopularProducts />
      {/* <NewProducts /> */}
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </div>
  );
}
