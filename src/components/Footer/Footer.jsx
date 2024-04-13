// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";

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
      alert("Thank you for visiting our store!");
    } else {
      alert("Please enter a valid email address!");
    }
  };

  return (
    <Fragment>
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
                    className="form-control rounded-pill px-5 py-2"
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
                <a href="/">
                  <img
                    src="/public/images/logo.png"
                    alt="Logo"
                    className="logo mb-2"
                  />
                </a>
              </div>
              <p className="text-secondary mb-3">
                We have clothes that will give you a new
                style and you will be proud of yourself and
                your purchase.
              </p>
              <div className="social d-flex mt-5">
                <a
                  href="https://www.facebook.com/"
                  className="social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                >
                  <i className="bi bi-facebook" />
                </a>
                <a
                  href="https://github.com/nqk0605"
                  className="mx-2 social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                  target="_blank"
                >
                  <i className="bi bi-github" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="mx-2 social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                  target="_blank"
                >
                  <i className="bi bi-linkedin" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="mx-2 social-icon d-flex text-black bg-white rounded-circle justify-content-center align-items-center fs-5"
                  target="_blank"
                >
                  <i className="bi bi-instagram" />
                </a>
              </div>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <a
                className="text-decoration-none text-dark"
                href="/"
              >
                <h1 className="fs-3 mb-3">Company</h1>
              </a>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/about"
                  >
                    About
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Feature
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Works
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/member"
                  >
                    Career
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <a
                className="text-decoration-none text-dark"
                href="/"
              >
                <h1 className="fs-3 mb-3">Help</h1>
              </a>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Customer Support
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Delivery Details
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <a
                className="text-decoration-none text-dark"
                href="/"
              >
                <h1 className="fs-3 mb-3">FAQ</h1>
              </a>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/login"
                  >
                    Account
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Manage Deliveries
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/shop"
                  >
                    Orders
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/cart"
                  >
                    Payments
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-links my-2 col-6 col-md-2">
              <a
                className="text-decoration-none text-dark"
                href="/"
              >
                <h1 className="fs-3 mb-3">Resources</h1>
              </a>
              <ul className="list-unstyled p-0">
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Free eBooks
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Development Tutorial
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    How to - Blog
                  </a>
                </li>
                <li className="my-2">
                  <a
                    className="text-secondary text-decoration-none"
                    href="/"
                  >
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-3" />
            <div className="d-flex justify-content-between">
              <div className="text-secondary text-start">
                All Rights Reserved 2024 ©
              </div>
              <div className="text-end">
                <a href="/" className="text-black mx-2">
                  <i className="bi bi-credit-card-fill" />
                </a>
                <a href="/" className="text-black mx-2">
                  <i className="bi bi-credit-card" />
                </a>
                <a href="/" className="text-black mx-2">
                  <i className="bi bi-credit-card-2-front-fill" />
                </a>
                <a href="/" className="text-black mx-2">
                  <i className="bi bi-paypal" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
