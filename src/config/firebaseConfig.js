import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWe_iMG1wIu8cU9_3g5J5tvXJjRLxpcBs",
  authDomain: "ecshop-7e1f9.firebaseapp.com",
  projectId: "ecshop-7e1f9",
  storageBucket: "ecshop-7e1f9.appspot.com",
  messagingSenderId: "671174466117",
  appId: "1:671174466117:web:e0367dd83f5cafcb31a12c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
export default app;
