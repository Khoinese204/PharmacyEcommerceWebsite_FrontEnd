import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-6">{children}</main>
    </>
  );
}

export default Layout;
