// eslint-disable-next-line no-unused-vars
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { auth } from "../../config/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/authContext/authContext";
import {
  checkEmail,
  checkLongPassword,
} from "../../utils/validateForm";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (
      emailRef.current?.value.trim().length > 0 &&
      passwordRef.current?.value.trim().length > 0
    ) {
      if (
        checkEmail(emailRef.current.value.trim()) &&
        checkLongPassword(passwordRef.current.value.trim())
      ) {
        try {
          const response = await signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
          );
          console.log(response);
          login(response.user.email);
          navigate("/");
        } catch (error) {
          toast.error("Login failed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      } else {
        toast.error("Please fullfil correct value!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    }
  };

  return (
    <Fragment>
      <Loader />
      <ToastContainer />
      <section className="container mb-5">
        <div className="container-fluid p-0">
          <div className="login-container">
            <section className="login-form">
              <h2 className="form-title">Login</h2>
              <form className="form-element">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Email address
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Password
                  </label>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
              <div className="sign-up">
                <span>Don’t Have An Account?</span>
                <span
                  className="sign-up_text text-primary pointer-cursor"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </div>
            </section>
            <section className="login-background" />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
