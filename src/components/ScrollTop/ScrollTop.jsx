/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`btn btn-danger btn-lg btn-top ${
        isVisible ? "show" : ""
      }`}
      onClick={scrollToTop}
      title="Go to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

export default ScrollTop;
