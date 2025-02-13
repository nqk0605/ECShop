/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { auth } from "../../config/firebaseConfig";
import { useAuth } from "../../context/authContext/authContext";
import {
  checkEmail,
  checkLongPassword,
} from "../../utils/validateForm";
import { Helmet } from "react-helmet";

const Signup = () => {
  const navigate = useNavigate();
  const { googleLogin, facebookLogin, account } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (account) {
      navigate("/");
    }
  }, [account]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (
      emailRef.current.value.trim().length > 0 &&
      passwordRef.current.value.trim().length > 0
    ) {
      if (
        checkEmail(emailRef.current.value.trim()) &&
        checkLongPassword(passwordRef.current.value.trim())
      ) {
        try {
          const response =
            await createUserWithEmailAndPassword(
              auth,
              emailRef.current.value,
              passwordRef.current.value
            );
          console.log(response);
        } catch (error) {
          toast.error("Create account failed!", {
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
        <title>Signup - MenWear</title>
      </Helmet>
      <section className="container mb-5">
        <div className="container-fluid p-0">
          <div className="signup-container">
            <section className="signup-background"></section>
            <section className="signup-form">
              <h2 className="form-title">Sign Up</h2>
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
                  onClick={handleSignUp}
                  className="btn btn-primary"
                >
                  Register
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
              <div className="login">
                <span>Already Have An Account?</span>
                <span
                  className="login_text text-primary pointer-cursor"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;
