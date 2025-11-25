import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const API_BASE = "http://localhost:8080";

// ===== Kiểu dữ liệu =====

interface ChatRoomSummary {
  id: number;
  customerName: string;
  pharmacistName: string;
  status: string;
  createdAt: string;
  // mấy field này nếu BE chưa có thì bỏ:
  lastMessage?: string | null;
  lastUpdatedAt?: string | null;
  unreadCount?: number;
}

interface ChatMessageDto {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  senderRole: "CUSTOMER" | "PHARMACIST";
  content: string;
  sentAt: string; // ISO string
}

const PharmacistChatPage: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoomSummary[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomSummary | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [input, setInput] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  const token = localStorage.getItem("token");

  // ===== 1. Heartbeat: đánh dấu dược sĩ đang online =====
  useEffect(() => {
    if (!token) return;

    const heartbeat = async () => {
      try {
        await axios.put(
          `${API_BASE}/api/support/heartbeat`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Heartbeat error", err);
      }
    };

    heartbeat(); // gọi ngay khi vào trang
    const intervalId = window.setInterval(heartbeat, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [token]);

  // ===== 2. Lấy danh sách room mà dược sĩ phụ trách =====
  const fetchRooms = async () => {
    if (!token) {
      setError("Bạn cần đăng nhập với tài khoản DƯỢC SĨ.");
      return;
    }

    try {
      setLoadingRooms(true);
      setError(null);

      // TODO: chỉnh lại path nếu backend của bạn khác
      const res = await axios.get<ChatRoomSummary[]>(
        `${API_BASE}/api/chat/rooms/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRooms(res.data || []);
    } catch (err) {
      console.error("Fetch rooms error", err);
      setError("Không tải được danh sách hội thoại.");
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ===== 3. Kết nối WebSocket bằng STOMP + SockJS =====
  useEffect(() => {
    if (!token) return;

    const client = new Client({
      // ❗ Dùng SockJS nên KHÔNG dùng brokerURL
      webSocketFactory: () => new SockJS(`${API_BASE}/ws`),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      debug: (str) => {
        console.log("[STOMP]", str);
      },

      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("✅ WS connected (pharmacist)");
      setWsConnected(true);

      // Nếu đã chọn room rồi thì subscribe luôn
      if (selectedRoom) {
        subscribeRoom(client, selectedRoom.id);
      }
    };

    client.onStompError = (frame) => {
      console.error("Broker error", frame.headers["message"], frame.body);
      setError("WebSocket lỗi, tin nhắn mới có thể không hiển thị ngay.");
    };

    client.onWebSocketClose = () => {
      console.warn("🔌 WebSocket closed");
      setWsConnected(false);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedRoom?.id]);

  // ===== 4. Subscribe 1 room cụ thể =====
  const subscribeRoom = (client: Client, roomId: number) => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    const destination = `/topic/rooms/${roomId}`;
    const sub = client.subscribe(destination, (message: IMessage) => {
      if (!message.body) return;

      try {
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
      } catch (e) {
        console.error("Error parsing WS message", e);
      }
    });

    subscriptionRef.current = sub;
  };

  // ===== 5. Khi dược sĩ chọn 1 phòng chat =====
  const handleSelectRoom = async (room: ChatRoomSummary) => {
    setSelectedRoom(room);
    setMessages([]);

    if (!token) return;

    try {
      setLoadingMessages(true);

      const res = await axios.get<ChatMessageDto[]>(
        `${API_BASE}/api/chat/rooms/${room.id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data || []);
    } catch (err) {
      console.error("Fetch messages error", err);
      setError("Không tải được lịch sử tin nhắn.");
    } finally {
      setLoadingMessages(false);
    }

    const client = stompClientRef.current;
    if (client && client.connected) {
      subscribeRoom(client, room.id);
    }
  };

  // ===== 6. Gửi tin nhắn từ dược sĩ =====
  const handleSend = () => {
    if (!selectedRoom || !input.trim()) return;

    const client = stompClientRef.current;
    if (!client || !client.connected) {
      alert("WebSocket chưa kết nối, vui lòng thử lại.");
      return;
    }

    client.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({
        roomId: selectedRoom.id,
        content: input.trim(),
      }),
    });

    setInput("");
  };

  // ===== UI =====
  return (
    <div className="p-4 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-xl shadow-lg h-full flex overflow-hidden">
        {/* Cột trái: danh sách hội thoại */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">Hội thoại</h2>
              {/* <p className="text-xs text-gray-500">
                Dược sĩ đang{" "}
                <span
                  className={
                    wsConnected ? "text-green-600 font-medium" : "text-red-500"
                  }
                >
                  {wsConnected
                    ? "online (realtime)"
                    : "offline (chỉ xem lịch sử)"}
                </span>
              </p> */}
            </div>
            <button
              onClick={fetchRooms}
              className="text-xs px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Refresh
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingRooms && (
              <div className="p-3 text-sm text-gray-500">
                Đang tải danh sách hội thoại...
              </div>
            )}

            {!loadingRooms && rooms.length === 0 && (
              <div className="p-3 text-sm text-gray-400">
                Chưa có hội thoại nào.
              </div>
            )}

            {rooms.map((room) => {
              const isActive = selectedRoom?.id === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => handleSelectRoom(room)}
                  className={`w-full text-left px-3 py-2 border-b border-gray-100 hover:bg-gray-50 ${
                    isActive ? "bg-emerald-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-gray-800">
                      {room.customerName || "Khách hàng"}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {new Date(room.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {/* tạm thời text mô tả */}
                    Đã tạo phòng chat
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${
                        room.status === "OPEN"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cột phải: nội dung chat */}
        <div className="flex-1 flex flex-col">
          {/* Header phòng */}
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            {selectedRoom ? (
              <div>
                <div className="font-semibold text-gray-800">
                  {selectedRoom.customerName}
                </div>
                <div className="text-xs text-gray-500">
                  Phòng #{selectedRoom.id} • Trạng thái:{" "}
                  <span className="font-medium">
                    {selectedRoom.status || "OPEN"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Chọn 1 hội thoại bên trái để trả lời khách.
              </div>
            )}
          </div>

          {/* Vùng tin nhắn */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-3">
            {loadingMessages && (
              <div className="text-sm text-gray-500">Đang tải tin nhắn...</div>
            )}

            {!loadingMessages && selectedRoom && messages.length === 0 && (
              <div className="text-sm text-gray-400">
                Chưa có tin nhắn trong phòng này.
              </div>
            )}

            {messages.map((m) => {
              const isPharmacist = m.senderRole === "PHARMACIST";
              return (
                <div
                  key={m.id}
                  className={`flex mb-2 ${
                    isPharmacist ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-sm text-left ${
                      isPharmacist
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {!isPharmacist && (
                      <div className="text-[11px] font-semibold text-gray-500 mb-0.5">
                        {m.senderName}
                      </div>
                    )}
                    <div className="break-words">{m.content}</div>
                    <div className="text-[10px] text-gray-300 mt-1 text-right">
                      {new Date(m.sentAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ô nhập tin */}
          <div className="border-t border-gray-200 p-3 flex items-center gap-2">
            <input
              disabled={!selectedRoom}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={
                selectedRoom
                  ? "Nhập nội dung trả lời khách..."
                  : "Chọn hội thoại trước khi trả lời"
              }
            />
            <button
              onClick={handleSend}
              disabled={!selectedRoom || !input.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                !selectedRoom || !input.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Gửi
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500 font-medium">{error}</div>
      )}
    </div>
  );
};

export default PharmacistChatPage;
