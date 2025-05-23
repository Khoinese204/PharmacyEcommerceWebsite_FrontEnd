import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

function WarehouseLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
      <Footer />
    </>
  );
}

export default WarehouseLayout;
