/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("account") || ""
  );

  const login = (user) => {
    setAccount(user);
    localStorage.setItem("account", user);
  };

  const logout = () => {
    setAccount("");
    localStorage.removeItem("account");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
