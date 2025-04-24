// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [loaderClass, setLoaderClass] = useState(
    "main-preloader"
  );
  useEffect(() => {
    handleShowLoader();
  }, []);

  const handleShowLoader = () => {
    setTimeout(() => {
      setLoaderClass((prev) => prev + " preloader-hide");
      setTimeout(() => {
        setLoaderClass((prev) => prev + " d-none");
        window.scrollTo(0, 0); // Scroll to top when loading is complete
      }, 500);
    }, 1000);
  };

  return (
    <div className={loaderClass}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
