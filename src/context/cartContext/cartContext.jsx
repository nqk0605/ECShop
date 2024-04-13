// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState } from "react";

// Create a context for the shopping cart
const CartContext = createContext();

// Custom hook to use the cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

// Component to provide the cart context to its children
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    setCart((prev) => {
      let isExistedProductId = null;
      prev.forEach((prod) => {
        if (prod.id === product.id) {
          isExistedProductId = prod.id;
        }
      });
      if (isExistedProductId !== null) {
        const newCart = prev.map((prod) => {
          if (prod.id === isExistedProductId) {
            localStorage.setItem(
              "cart",
              JSON.stringify({ ...prod, quantity: prod.quantity + 1 })
            );
            return { ...prod, quantity: prod.quantity + 1 };
          } else {
            localStorage.setItem("cart", JSON.stringify(prod));
            return prod;
          }
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      } else {
        localStorage.setItem("cart", JSON.stringify([...prev, product]));
        return [...prev, product];
      }
    });
  };

  const increaseProduct = (productId) => {
    setCart((prev) => {
      const newCart = prev.map((prod) => {
        if (prod.id === productId) {
          return { ...prod, quantity: prod.quantity + 1 };
        } else return prod;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const decreaseProduct = (productId) => {
    setCart((prev) => {
      const newCart = prev.map((prod) => {
        if (prod.id === productId) {
          return { ...prod, quantity: prod.quantity - 1 };
        } else return prod;
      });

      const updateWithoutZeroQuantity = newCart.filter(
        (prod) => prod.quantity > 0
      );
      localStorage.setItem("cart", JSON.stringify(updateWithoutZeroQuantity));
      return updateWithoutZeroQuantity;
    });
  };

  const deleteProduct = (productId) => {
    setCart((prev) => prev.filter((prod) => prod.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseProduct,
        decreaseProduct,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
