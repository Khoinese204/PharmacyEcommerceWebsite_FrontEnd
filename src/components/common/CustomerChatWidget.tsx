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
  senderRole: "CUSTOMER" | "PHARMACIST";
  content: string;
  sentAt: string;
};

const CustomerChatWidget: React.FC = () => {
  const [room, setRoom] = useState<ChatRoomResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stompClientRef = useRef<Stomp.Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const token = localStorage.getItem("token");

  // Auto scroll tới cuối khi có message mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 1) Khi mở widget → tạo / lấy room + load lịch sử + connect WS
  useEffect(() => {
    if (!token) {
      setError("Bạn cần đăng nhập để sử dụng chat hỗ trợ.");
      return;
    }

    const initChat = async () => {
      try {
        setError(null);
        setConnecting(true);

        // 1.1 Start chat (tạo / lấy room OPEN cho customer hiện tại)
        const roomRes = await axios.post<ChatRoomResponse>(
          `${API_BASE}/api/chat/start`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const roomData = roomRes.data;
        setRoom(roomData);

        // 1.2 Load lịch sử messages
        const msgRes = await axios.get<ChatMessage[]>(
          `${API_BASE}/api/chat/rooms/${roomData.id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(msgRes.data);

        // 1.3 Connect WebSocket
        connectWebSocket(roomData.id);
      } catch (err: any) {
        console.error("Init chat error", err);
        setError("Không thể khởi tạo phòng chat. Vui lòng thử lại sau.");
      } finally {
        setConnecting(false);
      }
    };

    initChat();

    // cleanup khi unmount
    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("WS disconnected");
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // chạy 1 lần khi mount

  // Hàm connect WS
  const connectWebSocket = (roomId: number) => {
    if (!token) return;

    const socket = new SockJS(`${API_BASE}/ws`);
    const stompClient = Stomp.over(socket);

    stompClientRef.current = stompClient;

    stompClient.connect(
      {
        Authorization: "Bearer " + token, // Gửi JWT trong STOMP header
      },
      () => {
        console.log("✅ WebSocket connected");
        setConnected(true);

        // Subscribe vào room
        const dest = `/topic/rooms/${roomId}`;
        stompClient.subscribe(dest, (message) => {
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
        setError(
          "Mất kết nối realtime, tin nhắn mới có thể không hiển thị ngay."
        );
      }
    );
  };

  // Gửi message
  const handleSend = () => {
    if (!room || !input.trim()) return;
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      alert("Chưa kết nối chat. Vui lòng đợi hoặc tải lại trang.");
      return;
    }

    const body = JSON.stringify({
      roomId: room.id,
      content: input.trim(),
    });

    stompClientRef.current.send("/app/chat.sendMessage", {}, body);
    setInput("");
  };

  if (!token) {
    return (
      <div className="chat-widget">
        <p>Hãy đăng nhập để trò chuyện với dược sĩ.</p>
      </div>
    );
  }

  return (
    <div
      className="chat-widget"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        height: 420,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "8px 12px",
          background: "#0f766e",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 14,
        }}
      >
        <div>
          <div style={{ fontWeight: 600 }}>Tư vấn cùng dược sĩ</div>
          {/* <div style={{ fontSize: 12, opacity: 0.9 }}>
            {room?.pharmacistName
              ? `Đang kết nối: ${room.pharmacistName}`
              : "Đang tìm dược sĩ hỗ trợ..."}
          </div> */}
        </div>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: connected ? "#22c55e" : "#9ca3af",
          }}
        />
      </div>

      {/* Body messages */}
      <div
        style={{
          flex: 1,
          padding: "8px 10px",
          overflowY: "auto",
          fontSize: 13,
          background: "#f9fafb",
        }}
      >
        {connecting && <div>Đang khởi tạo phòng chat...</div>}
        {error && (
          <div style={{ color: "red", marginBottom: 8 }}>
            {error}
            <br />
          </div>
        )}

        {messages.map((m) => {
          const isMe = m.senderRole === "CUSTOMER"; // phía khách
          return (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "6px 8px",
                  borderRadius: 8,
                  background: isMe ? "#0ea5e9" : "#e5e7eb",
                  color: isMe ? "#fff" : "#111827",
                  fontSize: 13,
                  whiteSpace: "pre-wrap",
                  textAlign: "left", // 👈 THÊM DÒNG NÀY
                  wordBreak: "break-word", // (tuỳ chọn) để không tràn dòng
                }}
              >
                <div>{m.content}</div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "6px",
          display: "flex",
          gap: 6,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Nhập câu hỏi của bạn..."
          style={{
            flex: 1,
            fontSize: 13,
            padding: "6px 8px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "none",
            background: "#0f766e",
            color: "#fff",
            fontSize: 13,
            cursor: input.trim() ? "pointer" : "not-allowed",
          }}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default CustomerChatWidget;
