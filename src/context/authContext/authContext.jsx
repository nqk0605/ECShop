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
  const [account, setAccount] = useState(() => {
    const savedAccount = localStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : null;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const accountData = {
          email: user.email,
          displayName: user.displayName || "",
        };
        setAccount(accountData);
        localStorage.setItem(
          "account",
          JSON.stringify(accountData)
        );
      } else {
        setAccount(null);
        localStorage.removeItem("account");
      }
    });
    return unsubscribe;
  }, []);

  const login = (user) => {
    setAccount(user);
    localStorage.setItem("account", JSON.stringify(user));
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );
      const accountData = {
        email: result.user.email,
        displayName: result.user.displayName || "",
      };
      setAccount(accountData);
      localStorage.setItem(
        "account",
        JSON.stringify(accountData)
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
      const accountData = {
        email: result.user.email,
        displayName: result.user.displayName || "",
      };
      setAccount(accountData);
      localStorage.setItem(
        "account",
        JSON.stringify(accountData)
      );
    } catch (error) {
      console.error("Facebook login failed:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setAccount(null);
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
