import React from "react";

const QASection = ({ medicineId }: { medicineId: number }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 md:col-span-3 mt-10">
      <h3 className="text-lg font-semibold mb-4">Hỏi đáp sản phẩm</h3>
      <div className="text-sm text-gray-500">
        Tính năng Hỏi đáp sẽ được tích hợp sau khi backend cung cấp API Q&A.
      </div>
    </section>
  );
};

export default QASection;
