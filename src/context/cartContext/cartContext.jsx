// eslint-disable-next-line no-unused-vars
import React, {
  createContext,
  useContext,
  useState,
} from "react";

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
      let isExistedProduct = null;
      prev.forEach((prod) => {
        if (
          prod.id === product.id &&
          prod.size === product.size
        ) {
          isExistedProduct = prod;
        }
      });
      if (isExistedProduct !== null) {
        const newCart = prev.map((prod) => {
          if (
            prod.id === isExistedProduct.id &&
            prod.size === isExistedProduct.size
          ) {
            return { ...prod, quantity: prod.quantity + 1 };
          } else {
            return prod;
          }
        });
        localStorage.setItem(
          "cart",
          JSON.stringify(newCart)
        );
        return newCart;
      } else {
        const newCart = [...prev, product];
        localStorage.setItem(
          "cart",
          JSON.stringify(newCart)
        );
        return newCart;
      }
    });
  };

  const increaseProduct = (productId, size) => {
    setCart((prev) => {
      const newCart = prev.map((prod) => {
        if (prod.id === productId && prod.size === size) {
          return { ...prod, quantity: prod.quantity + 1 };
        } else return prod;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const decreaseProduct = (productId, size) => {
    setCart((prev) => {
      const newCart = prev.map((prod) => {
        if (prod.id === productId && prod.size === size) {
          return { ...prod, quantity: prod.quantity - 1 };
        } else return prod;
      });

      const updateWithoutZeroQuantity = newCart.filter(
        (prod) => prod.quantity > 0
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(updateWithoutZeroQuantity)
      );
      return updateWithoutZeroQuantity;
    });
  };

  const deleteProduct = (productId, size) => {
    setCart((prev) => {
      const newCart = prev.filter(
        (prod) =>
          !(prod.id === productId && prod.size === size)
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const resetCart = (newCart = []) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseProduct,
        decreaseProduct,
        deleteProduct,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
