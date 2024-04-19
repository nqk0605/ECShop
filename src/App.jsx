import "./styles/style.css";
import "./styles/reset.css";
import "./styles/signup.css";
import "./styles/login.css";
import "./styles/scroll.css";
import "./styles/bootstrap.min.css";
import "./styles/bootstrap-icons.min.css";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/cartContext/cartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Loader />
        <div className="container-fluid p-0">
          <Header />
          <Outlet />
          <ScrollTop />
          <Footer />
        </div>
      </CartProvider>
    </>
  );
}

export default App;
