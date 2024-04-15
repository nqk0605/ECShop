// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (email.trim() !== "" && emailPattern.test(email)) {
      toast.success("Thank you for visiting our store!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      toast.error("Please enter a valid email address!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="newsletter px-3">
        <div className="container px-3 py-4 rounded-4">
          <div className="row">
            <div className="flex-grow-1 col-md-8 my-3">
              <h1 className="text-white w-75">
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </h1>
            </div>
            <div className="col-md-4 my-3">
              <form onSubmit={handleSubmit}>
                <div className="w-100 my-2">
                  <input
                    type="email"
                    className="form-control rounded-pill px-5 py-2 text-center"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-100 my-100">
                  <button
                    type="submit"
                    className="btn bg-white rounded-pill px-5 w-100 py-2"
                  >
                    Subscribe to Newsletter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-5">
        <div className="container position-relative">
          <div className="row">
            <div className="my-2 col-12 col-md-4">
              <div className="d-flex justify-content-center mb-3">
                <Link to="/">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="logo mb-2"
                  />
                </Link>
              </div>
              <p className="text-secondary mb-3">
                We have clothes that will give you a new
                style and you will be proud of yourself and
                your purchase.
              </p>
              <div className="social d-flex mt-5">
                <Link
                  to="https://www.facebook.com/"
                  className="social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                >
                  <i className="bi bi-facebook" />
                </Link>
                <Link
                  to="https://github.com/nqk0605"
                  className="mx-2 social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                  target="_blank"
                >
                  <i className="bi bi-github" />
                </Link>
                <Link
                  to="https://www.linkedin.com/"
                  className="mx-2 social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                  target="_blank"
                >
                  <i className="bi bi-linkedin" />
                </Link>
                <Link
                  to="https://www.instagram.com/"
                  className="mx-2 social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                  target="_blank"
                >
                  <i className="bi bi-instagram" />
                </Link>
              </div>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <Link
                className="text-decoration-none text-dark"
                to="/"
              >
                <h1 className="fs-3 mb-3">Company</h1>
              </Link>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Feature
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Works
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/member"
                  >
                    Career
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <Link
                className="text-decoration-none text-dark"
                to="/"
              >
                <h1 className="fs-3 mb-3">Help</h1>
              </Link>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Delivery Details
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <Link
                className="text-decoration-none text-dark"
                to="/"
              >
                <h1 className="fs-3 mb-3">FAQ</h1>
              </Link>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/login"
                  >
                    Account
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Manage Deliveries
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/shop"
                  >
                    Orders
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/cart"
                  >
                    Payments
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <Link
                className="text-decoration-none text-dark"
                to="/"
              >
                <h1 className="fs-3 mb-3">Resources</h1>
              </Link>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Free eBooks
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Development Tutorial
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    How to - Blog
                  </Link>
                </li>
                <li className="my-2">
                  <Link
                    className="text-secondary text-decoration-none"
                    to="/"
                  >
                    Youtube Playlist
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="my-3" />
            <div className="d-flex justify-content-between">
              <div className="text-secondary text-start">
                All Rights Reserved 2024 ©
              </div>
              <div className="text-end">
                <Link to="/" className="text-black mx-2">
                  <i className="bi bi-credit-card-fill" />
                </Link>
                <Link to="/" className="text-black mx-2">
                  <i className="bi bi-credit-card" />
                </Link>
                <Link to="/" className="text-black mx-2">
                  <i className="bi bi-credit-card-2-front-fill" />
                </Link>
                <Link to="/" className="text-black mx-2">
                  <i className="bi bi-paypal" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
