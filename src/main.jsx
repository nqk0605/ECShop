import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Cart from "./pages/cart/Cart.jsx";
import ProductDetail from "./pages/product-detail/ProductDetail.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Home from "./pages/Home/Home.jsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext/authContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetail />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
