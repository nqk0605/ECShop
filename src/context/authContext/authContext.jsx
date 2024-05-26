/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../config/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("account") || ""
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAccount(user.displayName);
        localStorage.setItem("account", user.displayName);
      } else {
        setAccount("");
        localStorage.removeItem("account");
      }
    });
    return unsubscribe;
  }, []);

  const login = (user) => {
    setAccount(user);
    localStorage.setItem("account", user);
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );
      setAccount(result.user.displayName);
      localStorage.setItem(
        "account",
        result.user.displayName
      );
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        facebookProvider
      );
      setAccount(result.user.displayName);
      localStorage.setItem(
        "account",
        result.user.displayName
      );
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setAccount("");
    localStorage.removeItem("account");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        login,
        googleLogin,
        facebookLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
