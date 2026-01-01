import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
// 👇 1. Import useNavigate
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

// ... (Giữ nguyên các Interface: ChatRoomSummary, ChatMessageDto, UserProfile) ...
interface ChatRoomSummary {
  id: number;
  customerId: number;
  customerName: string;
  status: string;
  type: "MEDICAL_ADVICE" | "ORDER_SUPPORT";
  createdAt: string;
  lastMessage?: string | null;
  lastUpdatedAt?: string | null;
  unreadCount?: number;
}

interface ChatMessageDto {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  senderRole: "CUSTOMER" | "PHARMACIST" | "SALES";
  content: string;
  sentAt: string;
}

interface UserProfile {
  name: string;
  role: string;
}

const SupportChatPage: React.FC = () => {
  // 👇 2. Khởi tạo navigate
  const navigate = useNavigate();

  // State Data
  const [rooms, setRooms] = useState<ChatRoomSummary[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomSummary | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // State UI
  const [input, setInput] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const token = localStorage.getItem("token");

  // ===== XỬ LÝ ROLE & THEME =====
  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const decoded: any = JSON.parse(jsonPayload);

        let roleFromToken = "";
        if (decoded.scope) roleFromToken = decoded.scope;
        else if (decoded.roles)
          roleFromToken = Array.isArray(decoded.roles)
            ? decoded.roles[0]
            : decoded.roles;
        else if (decoded.role) roleFromToken = decoded.role;
        else if (decoded.authorities)
          roleFromToken = Array.isArray(decoded.authorities)
            ? decoded.authorities[0]
            : decoded.authorities;

        const nameFromToken =
          decoded.sub || decoded.fullName || decoded.email || "Nhân viên";

        setUserProfile({ name: nameFromToken, role: roleFromToken });
      } catch (e) {
        console.error(e);
      }
    }
  }, [token]);

  const userRole = userProfile?.role?.toUpperCase() || "";
  const isSales =
    userRole.includes("SALE") ||
    userRole.includes("STAFF") ||
    userRole.includes("SELLER");

  const theme = {
    primary: isSales ? "bg-blue-600" : "bg-emerald-600",
    primaryHover: isSales ? "hover:bg-blue-700" : "hover:bg-emerald-700",
    lightBg: isSales ? "bg-blue-50" : "bg-emerald-50",
    border: isSales ? "border-blue-200" : "border-emerald-200",
    text: isSales ? "text-blue-700" : "text-emerald-700",
    icon: isSales ? "📦" : "💊",
    title: isSales ? "Hỗ trợ Đơn hàng" : "Tư vấn Sức khỏe",
  };

  // ... (Giữ nguyên phần useEffect kết nối WebSocket và Fetch API) ...
  useEffect(() => {
    if (!token) return;
    const heartbeat = async () => {
      try {
        await axios.put(
          `${API_BASE}/api/support/heartbeat`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (e) {}
    };
    heartbeat();
    const interval = setInterval(heartbeat, 30000);
    fetchRooms();
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      onConnect: () => {
        setWsConnected(true);
        if (selectedRoom) subscribeRoom(client, selectedRoom.id);
      },
      onWebSocketClose: () => setWsConnected(false),
      onStompError: () => setError("Mất kết nối WebSocket"),
    });
    client.activate();
    stompClientRef.current = client;
    return () => {
      clearInterval(interval);
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ... (Giữ nguyên các hàm fetchRooms, subscribeRoom, handleSend) ...
  const fetchRooms = async () => {
    if (!token) return;
    try {
      setLoadingRooms(true);
      const res = await axios.get<ChatRoomSummary[]>(
        `${API_BASE}/api/chat/rooms/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRooms(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách hội thoại.");
    } finally {
      setLoadingRooms(false);
    }
  };

  const subscribeRoom = (client: Client, roomId: number) => {
    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
    subscriptionRef.current = client.subscribe(
      `/topic/rooms/${roomId}`,
      (message: IMessage) => {
        if (!message.body) return;
        const payload: ChatMessageDto = JSON.parse(message.body);
        setMessages((prev) => [...prev, payload]);
        setRooms((prev) =>
          prev.map((r) =>
            r.id === roomId
              ? {
                  ...r,
                  lastMessage: payload.content,
                  lastUpdatedAt: payload.sentAt,
                }
              : r
          )
        );
      }
    );
  };

  const handleSelectRoom = async (room: ChatRoomSummary) => {
    setSelectedRoom(room);
    setMessages([]);
    try {
      setLoadingMessages(true);
      const res = await axios.get<ChatMessageDto[]>(
        `${API_BASE}/api/chat/rooms/${room.id}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
    const client = stompClientRef.current;
    if (client && client.connected) {
      subscribeRoom(client, room.id);
    }
  };

  const handleSend = () => {
    if (!selectedRoom || !input.trim()) return;
    const client = stompClientRef.current;
    if (!client || !client.connected) {
      alert("Mất kết nối WebSocket.");
      return;
    }
    client.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({ roomId: selectedRoom.id, content: input.trim() }),
    });
    setInput("");
  };

  const handleLogout = () => {
    const confirm = window.confirm("Bạn có chắc muốn đăng xuất?");
    if (confirm) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  // 👇 3. Hàm quay về Dashboard (Chỉ dùng cho Sales)
  const handleBackToDashboard = () => {
    navigate("/sales/dashboard"); // Điều hướng về dashboard
  };

  // ===== RENDER UI =====
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        {/* Header Sidebar */}
        <div
          className={`p-4 border-b border-gray-200 flex items-center justify-between ${theme.lightBg}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white border ${theme.border} shadow-sm`}
            >
              {theme.icon}
            </div>
            <div className="overflow-hidden">
              <h2 className={`font-bold text-sm ${theme.text}`}>
                {theme.title}
              </h2>
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    wsConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className="text-xs text-gray-500 truncate block max-w-[100px]"
                  title={userProfile?.name}
                >
                  {userProfile?.name || "Loading..."}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* 👇 4. NÚT QUAY LẠI DASHBOARD (Chỉ hiện nếu là SALES) */}
            {isSales && (
              <button
                onClick={handleBackToDashboard}
                className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                title="Về Dashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </button>
            )}

            {/* Nút Logout (Hiện cho cả 2 role) */}
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
              title="Đăng xuất"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="px-4 py-2 bg-white border-b border-gray-100">
          <button
            onClick={fetchRooms}
            className="w-full text-xs text-gray-500 hover:text-gray-700 py-1.5 border border-dashed rounded bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            🔄 Làm mới danh sách
          </button>
        </div>

        {/* List Rooms */}
        <div className="flex-1 overflow-y-auto">
          {loadingRooms ? (
            <div className="text-center p-4 text-xs text-gray-400">
              Đang tải danh sách...
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center p-4 text-xs text-gray-400 flex flex-col gap-2">
              <span>📭</span>
              <span>
                {isSales
                  ? "Chưa có đơn cần hỗ trợ."
                  : "Chưa có câu hỏi tư vấn."}
              </span>
            </div>
          ) : (
            rooms.map((room) => {
              const isActive = selectedRoom?.id === room.id;
              const isMedical = room.type === "MEDICAL_ADVICE";
              return (
                <div
                  key={room.id}
                  onClick={() => handleSelectRoom(room)}
                  className={`cursor-pointer p-3 border-b border-gray-50 hover:bg-gray-50 transition-all ${
                    isActive
                      ? `${theme.lightBg} border-l-4 ${
                          isSales ? "border-l-blue-500" : "border-l-emerald-500"
                        }`
                      : "border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-800 line-clamp-1">
                      {room.customerName}
                    </span>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-1">
                      {new Date(room.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex mb-1">
                    <span
                      className={`text-[10px] px-1.5 rounded border ${
                        isMedical
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-blue-50 text-blue-600 border-blue-100"
                      }`}
                    >
                      {isMedical ? "Thuốc" : "Đơn hàng"}
                    </span>
                  </div>
                  <p
                    className={`text-xs truncate ${
                      isActive ? theme.text : "text-gray-500"
                    }`}
                  >
                    {room.lastMessage || "Chưa có tin nhắn"}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* KHUNG CHAT (Giữ nguyên) */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedRoom ? (
          <>
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shadow-sm z-10">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {selectedRoom.customerName}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  Mã phòng: <b>#{selectedRoom.id}</b> •
                  <span
                    className={
                      selectedRoom.type === "MEDICAL_ADVICE"
                        ? "text-emerald-600"
                        : "text-blue-600"
                    }
                  >
                    {selectedRoom.type === "MEDICAL_ADVICE"
                      ? " Tư vấn thuốc"
                      : " Hỗ trợ đơn hàng"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {loadingMessages && (
                <div className="text-center text-xs text-gray-400 mt-4">
                  Đang tải lịch sử tin nhắn...
                </div>
              )}
              {messages.map((m, index) => {
                const isMe =
                  m.senderRole === "PHARMACIST" || m.senderRole === "SALES";
                return (
                  <div
                    key={index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                        isMe
                          ? `${theme.primary} text-white rounded-br-none`
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      {!isMe && (
                        <p className="text-[10px] font-bold text-gray-400 mb-0.5">
                          {m.senderName}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {m.content}
                      </p>
                      <p
                        className={`text-[10px] mt-1 text-right ${
                          isMe ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        {new Date(m.sentAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={
                    isSales
                      ? "Nhập thông tin hỗ trợ đơn hàng..."
                      : "Nhập tư vấn thuốc..."
                  }
                  className="flex-1 border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all shadow-sm"
                  style={{ boxShadow: "none" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`px-6 py-2 rounded-full font-bold text-white transition-all shadow-sm ${
                    !input.trim()
                      ? "bg-gray-300 cursor-not-allowed"
                      : `${theme.primary} ${theme.primaryHover}`
                  }`}
                >
                  Gửi
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300 select-none">
            <div className={`text-6xl mb-4 opacity-40 grayscale`}>
              {theme.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-1">
              Xin chào, {userProfile?.name}
            </h3>
            <p className="text-sm text-gray-400">
              Vui lòng chọn một khách hàng để bắt đầu hỗ trợ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportChatPage;
