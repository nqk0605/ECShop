/* eslint-disable no-unused-vars */
import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { HEADER_ITEMS } from "../../constants/common.constant";
import { useAuth } from "../../context/authContext/authContext";

const Header = () => {
  const navigate = useNavigate();
  const { account, logout } = useAuth();
  const inputRef = useRef();
  const [isNoticeVisible, setIsNoticeVisible] =
    useState(true);

  const closeNotice = () => {
    setIsNoticeVisible(false);
  };

  useEffect(() => {
    if (account) {
      closeNotice();
    }
  }, [account]);

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      if (inputRef.current.value.trim().length > 0) {
        navigate(
          `/shop?search=${inputRef.current.value.trim()}`
        );
      } else {
        navigate("/shop");
      }
    }
  };

  const handleNavigateCart = () => {
    if (account?.email) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    // navigate("/");
    window.location.reload();
  };

  return (
    <Fragment>
      {isNoticeVisible && !account?.email && (
        <div className="header-notice w-100 d-flex py-2 fs-6 position-relative">
          <div className="text-center flex-grow-1">
            Sign up and get up to 30% off.
            <Link to="/signup" className="text-white">
              Sign up!
            </Link>
          </div>
          <div
            className="px-2 text-white pointer-cursor signup-dismiss"
            onClick={closeNotice}
          >
            <span>
              <i className="bi bi-x-lg" />
            </span>
          </div>
        </div>
      )}
      <header className="container main-header py-3">
        <div className="d-flex align-items-center">
          <div className="d-flex h-100 align-items-center">
            <button className="btn mx-1 text-black fs-5 open-menu d-block d-md-none">
              <i className="bi bi-list" />
            </button>
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="logo"
              />
            </Link>
          </div>
          <div className="flex-grow-1 mx-2">
            <div className="row d-flex d-md-none">
              <div className="col-11 mx-1">
                <div className="search-form-main d-flex rounded-pill border border-1 p-2">
                  <input
                    type="text"
                    ref={inputRef}
                    className="search-form position-relative border-0"
                    placeholder="Search..."
                    onKeyDown={handlePressEnter}
                  />
                </div>
              </div>
            </div>
            <div className="row d-none d-md-flex">
              <div className="col-7">
                <div className="d-flex rounded-pill search-form-main p-2">
                  <i className="bi bi-search fs-5 text-secondary d-inline-block" />
                  <input
                    type="text"
                    ref={inputRef}
                    className="search-input px-2"
                    placeholder="Search..."
                    onKeyDown={handlePressEnter}
                  />
                </div>
              </div>
              <div className="col-5 d-flex align-items-center">
                <ul className="header-menu-list">
                  {HEADER_ITEMS.map((item) => (
                    <li className="mx-2" key={item.id}>
                      <Link
                        to={item.url}
                        className="text-decoration-none text-black main-menu-link position-relative"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <button
              onClick={handleNavigateCart}
              className="mx-2 fw-bolder text-decoration-none text-black fs-5"
            >
              <i className="bi bi-cart" />
            </button>
            {account ? (
              <div className="user-profile mx-2 d-flex align-items-center">
                <span className="me-2">
                  {account.displayName || account.email}
                </span>
                <button
                  className="mx-2 fw-bolder text-decoration-none text-black fs-5"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="mx-2 fw-bolder text-decoration-none text-black fs-5"
              >
                <i className="bi bi-person-circle" />
              </Link>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
