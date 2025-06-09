import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // style mặc định
import TextareaAutosize from "react-textarea-autosize";

export default function AutoTextarea() {
  const [content, setContent] = useState("");

  return (
    // <div className="space-y-2">
    //   <label className="font-semibold text-gray-700">Công dụng thuốc</label>
    //   <ReactQuill
    //     theme="snow"
    //     value={content}
    //     onChange={setContent}
    //     className="bg-white"
    //     modules={{
    //       toolbar: [
    //         [{ header: [1, 2, false] }],
    //         ["bold", "italic", "underline"],
    //         [{ list: "ordered" }, { list: "bullet" }],
    //         ["link"],
    //         ["clean"],
    //       ],
    //     }}
    //   />
    //   <p className="text-xs text-gray-500">
    //     Nội dung sẽ được lưu dưới dạng HTML
    //   </p>
    // </div>
    // <textarea
    //   className="w-full h-40 p-3 border rounded"
    //   placeholder="Nhập công dụng thuốc"
    // />
    // <div className="p-4">
    //   <h2 className="font-bold mb-2">Mô tả sản phẩm</h2>
    //   <ReactQuill theme="snow" />
    // </div>
    <TextareaAutosize
      minRows={3}
      placeholder="Nhập mô tả sản phẩm dài..."
      className="w-full p-3 border rounded focus:ring-2 focus:ring-cyan-400"
    />
  );
}
