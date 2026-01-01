import React, { useState } from "react";
import axios from "axios";
import { FaRobot, FaTimes } from "react-icons/fa";

type Sender = "USER" | "AI";

interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
}

const API_BASE = "http://localhost:8080";

const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "USER",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/ai/ask/with-knowledge`, {
        question: trimmed,
      });

      // BE trả về { disclaimer, answer }
      const answer: string =
        res.data?.answer ??
        "Hệ thống chưa có dữ liệu cho câu hỏi này. Vui lòng liên hệ dược sĩ.";

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "AI",
        text: answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI API error", err);
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "AI",
        text:
          "Xin lỗi, hệ thống đang gặp sự cố khi kết nối với AI. " +
          "Vui lòng thử lại sau hoặc liên hệ trực tiếp dược sĩ.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Nút icon AI tròn ở góc phải dưới */}
      <button
        onClick={toggleOpen}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "90px",
          zIndex: 60,
          width: "56px",
          height: "56px",
          borderRadius: "999px",
          border: "none",
          background:
            "linear-gradient(135deg, #00bcd4 0%, #2196f3 50%, #3f51b5 100%)",
          color: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Chat với AI PrimeCare"
      >
        <FaRobot size={26} />
      </button>

      {/* Khung chat AI */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "96px", // để không đè lên nút
            width: "360px",
            height: "480px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            zIndex: 70,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #00bcd4 0%, #2196f3 50%, #3f51b5 100%)",
              color: "white",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaRobot />
              <div style={{ fontWeight: 600, fontSize: "14px" }}>
                PrimeCare AI Assistant
              </div>
            </div>
            <button
              onClick={toggleOpen}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              padding: "6px 12px",
              fontSize: "11px",
              color: "#666",
              borderBottom: "1px solid #eee",
            }}
          >
            Nội dung do AI gợi ý chỉ mang tính tham khảo, không thay thế tư vấn
            y khoa trực tiếp từ dược sĩ.
          </div>

          {/* Message list */}
          <div
            style={{
              flex: 1,
              padding: "10px 12px",
              overflowY: "auto",
              backgroundColor: "#f9fafb",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#777",
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                Hãy nhập câu hỏi về thuốc, triệu chứng, cách dùng thuốc…
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent:
                    m.sender === "USER" ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "8px 10px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    whiteSpace: "pre-wrap",
                    backgroundColor:
                      m.sender === "USER" ? "#0d6efd" : "#e5f3ff",
                    color: m.sender === "USER" ? "white" : "#222",
                    border:
                      m.sender === "AI"
                        ? "1px solid rgba(13, 110, 253, 0.4)"
                        : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#777",
                  marginTop: "6px",
                }}
              >
                AI đang suy nghĩ…
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "8px 10px",
              borderTop: "1px solid #eee",
              display: "flex",
              gap: "6px",
            }}
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                fontSize: "13px",
                padding: "8px 10px",
                borderRadius: "999px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                borderRadius: "999px",
                padding: "8px 14px",
                border: "none",
                backgroundColor: loading || !input.trim() ? "#ccc" : "#0d6efd",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                cursor: loading || !input.trim() ? "default" : "pointer",
              }}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistantWidget;
