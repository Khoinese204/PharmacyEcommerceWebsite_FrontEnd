import { Outlet, NavLink } from "react-router-dom";

// KHỎI DÙNG ADMIN LAYOUT NÀY
// export default function AdminLayout() {
//   const menu1 = [
//     { label: "Bảng điều khiển", path: "." },
//     { label: "Người dùng", path: "users" },
//     { label: "Thuốc", path: "medicines" },
//     { label: "Danh mục thuốc", path: "categories" },
//     { label: "Mã giảm giá", path: "coupons" },
//   ];
//   const menu2 = [
//     { label: "Kho", path: "/admin/warehouse" },
//     { label: "Doanh thu", path: "/admin/revenue" },
//     { label: "Khách hàng", path: "/admin/customers" },
//     { label: "Lịch sử giá", path: "/admin/price-history" },
//   ];

//   const renderMenu = (menu: typeof menu1) =>
//     menu.map((item) => (
//       <NavLink
//         key={item.path}
//         to={item.path}
//         className={({ isActive }) =>
//           `block w-full text-left px-3 py-2 rounded transition ${
//             isActive
//               ? "bg-blue-500 text-white"
//               : "text-gray-700 hover:bg-blue-50"
//           }`
//         }
//       >
//         {item.label}
//       </NavLink>
//     ));

//   return (
//     <div className="h-screen w-screen flex bg-gray-50 text-sm overflow-hidden">
//       {/* Sidebar */}
//       <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
//         <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
//         <nav className="space-y-2">
//           {renderMenu(menu1)}
//           <div className="h-px bg-gray-200 my-2" />
//           {renderMenu(menu2)}
//         </nav>
//       </aside>

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
//           <div className="ml-auto flex items-center gap-2 text-sm">
//             <img
//               src="/avatar.jpg"
//               alt="Avatar"
//               className="w-8 h-8 rounded-full"
//             />
//             <div>
//               <p className="font-semibold text-gray-800">Boss</p>
//               <p className="text-xs text-gray-500">Admin</p>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto px-4 py-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
