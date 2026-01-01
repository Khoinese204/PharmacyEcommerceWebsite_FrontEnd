import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";

const API_BASE = "http://localhost:8080";

type ChatRoomResponse = {
  id: number;
  customerName: string;
  pharmacistName: string | null;
  status: "OPEN" | "CLOSED" | "WAITING";
  createdAt: string;
};

type ChatMessage = {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  senderRole: "CUSTOMER" | "PHARMACIST" | "SALES";
  content: string;
  sentAt: string;
};

const CustomerChatWidget: React.FC = () => {
  // --- STATE ---
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng widget
  const [step, setStep] = useState<"MENU" | "CHAT">("MENU"); // Màn hình hiện tại

  const [room, setRoom] = useState<ChatRoomResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stompClientRef = useRef<Stomp.Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const token = localStorage.getItem("token");

  // Auto scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Cleanup khi tắt widget hoặc unmount
  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const disconnectWebSocket = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.disconnect(() => {
        console.log("WS disconnected");
        setConnected(false);
      });
    }
  };

  // --- HÀM BẮT ĐẦU CHAT ---
  const handleStartChat = async (type: "MEDICAL_ADVICE" | "ORDER_SUPPORT") => {
    if (!token) {
      setError("Bạn cần đăng nhập để sử dụng chat hỗ trợ.");
      return;
    }

    try {
      setError(null);
      setConnecting(true);

      // 1. Gọi API tạo phòng kèm tham số TYPE
      const roomRes = await axios.post<ChatRoomResponse>(
        `${API_BASE}/api/chat/start`,
        {},
        {
          params: { type: type }, // Gửi type lên backend
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const roomData = roomRes.data;
      setRoom(roomData);

      // 2. Load lịch sử tin nhắn
      const msgRes = await axios.get<ChatMessage[]>(
        `${API_BASE}/api/chat/rooms/${roomData.id}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(msgRes.data);

      // 3. Kết nối WebSocket
      connectWebSocket(roomData.id);

      // 4. Chuyển sang màn hình Chat
      setStep("CHAT");
    } catch (err: any) {
      console.error("Init chat error", err);
      setError("Không thể khởi tạo phòng chat. Vui lòng thử lại sau.");
    } finally {
      setConnecting(false);
    }
  };

  // Hàm connect WS
  const connectWebSocket = (roomId: number) => {
    if (!token) return;

    // Ngắt kết nối cũ nếu có
    disconnectWebSocket();

    const socket = new SockJS(`${API_BASE}/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {}; // Tắt log debug cho gọn console

    stompClientRef.current = stompClient;

    stompClient.connect(
      { Authorization: "Bearer " + token },
      () => {
        console.log("✅ WebSocket connected");
        setConnected(true);

        // Subscribe room
        stompClient.subscribe(`/topic/rooms/${roomId}`, (message) => {
          if (!message.body) return;
          try {
            const payload: ChatMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, payload]);
          } catch (e) {
            console.error("Error parsing WS message", e);
          }
        });
      },
      (error) => {
        console.error("❌ WS error", error);
        setConnected(false);
        setError("Mất kết nối realtime.");
      }
    );
  };

  // Gửi message
  const handleSend = () => {
    if (!room || !input.trim()) return;
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      alert("Đang kết nối lại, vui lòng chờ...");
      return;
    }

    const body = JSON.stringify({
      roomId: room.id,
      content: input.trim(),
    });

    stompClientRef.current.send("/app/chat.sendMessage", {}, body);
    setInput("");
  };

  // Nút quay lại menu (tuỳ chọn)
  const handleBack = () => {
    disconnectWebSocket();
    setStep("MENU");
    setMessages([]);
    setRoom(null);
  };

  // --- RENDER ---

  // 1. Nút mở Chat (Launcher)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#0f766e",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        💬
      </button>
    );
  }

  // 2. Widget Chat
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 340,
        height: 480,
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px",
          background: "#0f766e",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {step === "CHAT" && (
            <button
              onClick={handleBack}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ⬅
            </button>
          )}
          <span style={{ fontWeight: "bold" }}>Hỗ trợ trực tuyến</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ✖
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#f3f4f6",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* MÀN HÌNH 1: MENU CHỌN */}
        {step === "MENU" && (
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 15,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p style={{ textAlign: "center", color: "#555", marginBottom: 10 }}>
              Xin chào! Bạn cần hỗ trợ về vấn đề gì?
            </p>

            <button
              onClick={() => handleStartChat("MEDICAL_ADVICE")}
              style={menuButtonStyle("#059669")}
            >
              <span style={{ fontSize: 24 }}>💊</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: "bold" }}>Tư vấn thuốc</div>
                <div style={{ fontSize: 11, opacity: 0.9 }}>
                  Chat với Dược sĩ
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStartChat("ORDER_SUPPORT")}
              style={menuButtonStyle("#2563eb")}
            >
              <span style={{ fontSize: 24 }}>📦</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: "bold" }}>Đơn hàng</div>
                <div style={{ fontSize: 11, opacity: 0.9 }}>
                  Gặp CSKH / Sales
                </div>
              </div>
            </button>

            {!token && (
              <p
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: 12,
                  marginTop: 10,
                }}
              >
                * Bạn cần đăng nhập để chat
              </p>
            )}
          </div>
        )}

        {/* MÀN HÌNH 2: CHAT */}
        {step === "CHAT" && (
          <>
            <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
              {connecting && (
                <div
                  style={{ textAlign: "center", fontSize: 12, color: "#888" }}
                >
                  Đang kết nối...
                </div>
              )}
              {error && (
                <div
                  style={{
                    color: "red",
                    fontSize: 12,
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {error}
                </div>
              )}

              {messages.map((m, idx) => {
                const isMe = m.senderRole === "CUSTOMER";
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: isMe ? "flex-end" : "flex-start",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "8px 12px",
                        borderRadius: 12,
                        fontSize: 13,
                        backgroundColor: isMe ? "#0f766e" : "#e5e7eb",
                        color: isMe ? "#fff" : "#000",
                        borderBottomRightRadius: isMe ? 0 : 12,
                        borderBottomLeftRadius: isMe ? 12 : 0,
                      }}
                    >
                      {!isMe && (
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            marginBottom: 2,
                            color: "#555",
                          }}
                        >
                          {m.senderName}
                        </div>
                      )}
                      {m.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              style={{
                padding: 10,
                borderTop: "1px solid #ddd",
                background: "#fff",
                display: "flex",
                gap: 8,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Nhập tin nhắn..."
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: 20,
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: 13,
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? "#0f766e" : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: 20,
                  padding: "0 16px",
                  cursor: input.trim() ? "pointer" : "default",
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Gửi
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Helper style cho nút menu
const menuButtonStyle = (bgColor: string): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 15,
  borderRadius: 12,
  border: "none",
  background: bgColor,
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "transform 0.1s",
});

export default CustomerChatWidget;
