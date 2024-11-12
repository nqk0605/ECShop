/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { auth } from "../../config/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/authContext/authContext";
import {
  checkEmail,
  checkLongPassword,
} from "../../utils/validateForm";
import { Helmet } from "react-helmet";
import ModelViewer from "../../components/Model/ModelViewer";
import Model1 from "../../components/Model/Model1";

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin, facebookLogin, account } =
    useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (account) {
      navigate("/");
    }
  }, [account]);

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
        } catch (error) {
          toast.error("Login failed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      } else {
        toast.error("Please fulfill correct value!", {
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
      <Helmet>
        <title>Login - MenWear</title>
      </Helmet>
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
                  Login
                </button>
              </form>
              <span className="mt-3">Or Login with:</span>
              <div className="d-inline-block">
                <button
                    onClick={googleLogin}
                    className="btn btn-dark mt-3 mx-3"
                >
                  <i className="bi bi-google"></i>
                </button>
                <button
                    onClick={facebookLogin}
                    className="btn btn-dark mt-3 mx-3"
                >
                  <i className="bi bi-facebook"></i>
                </button>
              </div>
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
            <section className="login-background">
              <ModelViewer ModelComponent={Model1} />
            </section>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
