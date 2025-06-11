import { CartProvider } from "../../pages/customer/CartContext";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";


function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <>
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </>
    </CartProvider>
  );
}

export default CustomerLayout;
