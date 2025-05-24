import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
}

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {[
              "ID",
              "TÊN",
              "EMAIL",
              "SỐ ĐIỆN THOẠI",
              "VAI TRÒ",
              "HÀNH ĐỘNG",
            ].map((header) => (
              <th
                key={header}
                className={`px-4 py-3 font-semibold text-gray-700 ${
                  header === "HÀNH ĐỘNG" ? "text-center" : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                {user.email}
              </td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getRoleStyle(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-1 items-center">
                  <button>👁️</button>
                  <button>✏️</button>
                  <button>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getRoleStyle(role: string) {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-600";
    case "Sales Staff":
      return "bg-purple-100 text-purple-600";
    case "Warehouse Staff":
      return "bg-green-100 text-green-600";
    case "Customer":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
