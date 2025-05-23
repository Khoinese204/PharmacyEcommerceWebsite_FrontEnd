import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

function AdminLayout({ children }) {
  return (
    <>
      <main className="p-6">{children}</main>
    </>
  );
}

export default AdminLayout;
