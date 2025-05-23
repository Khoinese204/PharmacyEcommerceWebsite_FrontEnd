import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
      <h1>Hello</h1>
      <Footer />
    </>
  );
}

export default CustomerLayout;
