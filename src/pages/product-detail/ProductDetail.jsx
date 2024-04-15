// eslint-disable-next-line no-unused-vars
import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../../public/data/data";
import Loader from "../../components/Loader/Loader";
import { useCart } from "../../context/cartContext/cartContext";
import { ToastContainer, toast } from "react-toastify";

const ProductDetail = () => {
  const { state } = useLocation();
  const { addToCart } = useCart();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const [activeImage, setActiveImage] = useState(1);
  const product = state;
  const navigate = useNavigate();
  const similarProducts = PRODUCTS.filter(
    (originProduct) =>
      originProduct.categories === product.categories &&
      originProduct.id !== product.id
  );
  const showSimilarProducts = getRandomElements(
    similarProducts,
    4
  );

  // Random similar products
  function getRandomElements(array, count) {
    // Make a copy of the original array to avoid modifying it
    const shuffledArray = array.slice();
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    // Return the first 'count' elements of the shuffled array
    return shuffledArray.slice(0, count);
  }

  const handleAddProduct = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success("Add product to cart successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  return (
    <Fragment>
      <Loader />
      <ToastContainer />
      <div className="container-fluid p-0">
        <section className="container mb-5">
          <hr />
          <div className="row align-items-stretch justify-content-center">
            <div className="col-12" />
            <div className="col-1 d-none d-lg-block">
              <div className="image-menu d-flex flex-column">
                <img
                  src={product.image1}
                  alt="product"
                  className={`w-100 rounded-4 pointer-cursor my-2 gallery-img ${
                    activeImage !== 1 ? "opacity-50" : ""
                  }`}
                  onClick={() => setActiveImage(1)}
                />
                <img
                  src={product.image2}
                  alt="product"
                  className={`w-100 rounded-4 pointer-cursor my-2 gallery-img ${
                    activeImage !== 2 ? "opacity-50" : ""
                  }`}
                  onClick={() => setActiveImage(2)}
                />
                <img
                  src={product.image3}
                  alt="product"
                  className={`w-100 rounded-4 pointer-cursor my-2 gallery-img ${
                    activeImage !== 3 ? "opacity-50" : ""
                  }`}
                  onClick={() => setActiveImage(3)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <Loader />
              <div className="rounded-4 overflow-hidden position-relative">
                <img
                  src={
                    activeImage === 1
                      ? product.image1
                      : activeImage === 2
                      ? product.image2
                      : product.image3
                  }
                  alt="product"
                  className="w-100 rounded-4 my-2 product-image overflow-hidden"
                />
              </div>
            </div>
            <div className="col-12 row d-flex d-lg-none">
              <div className="col-4">
                <img
                  src={product.image2}
                  alt="product"
                  className="w-100 rounded-4 pointer-cursor my-2 gallery-img"
                />
              </div>
              <div className="col-4">
                <img
                  src={product.image3}
                  alt="product"
                  className="w-100 rounded-4 pointer-cursor my-2 opacity-50 gallery-img"
                />
              </div>
              <div className="col-4">
                <img
                  src={product.image1}
                  alt="product"
                  className="w-100 rounded-4 pointer-cursor my-2 opacity-50 gallery-img"
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="h-100 py-2">
                <div className="my-2">
                  <h1 className="fs-2 fw-bold">
                    {product.name}
                  </h1>
                </div>
                <div className="d-flex px-1">
                  <div
                    className="mx-1 fw-bold fs-4"
                    data-item-type="price"
                  >
                    {`${product.price}$`}
                  </div>
                  <div className="mx-1">
                    <strike>
                      {Math.round(
                        product.price /
                          product.percentSalesOff
                      ) + "$"}
                    </strike>
                  </div>
                  <div className="mx-1">
                    <span className="bg-danger-subtle rounded-pill px-2 py-1">
                      {Math.round(
                        product.percentSalesOff * 100
                      ) + "%"}
                    </span>
                  </div>
                </div>

                <div className="my-2">
                  <p className="text-secondary">
                    {product.description}
                  </p>
                </div>
                <hr />
                <div className="my-2 row">
                  <div className="col-md-9 px-2">
                    <button
                      className="btn main-btn py-2 text-white rounded-pill w-100 my-2 mx-2 bg-alternative"
                      onClick={() =>
                        handleAddProduct(product)
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="w-100 text-center my-4">
                <h1 className="fw-bolder">
                  Similar products
                </h1>
              </div>
              <div className="row my-3 product-row overflow-x-hidden align-items-stretch last-products pointer-cursor">
                {showSimilarProducts.map((prod) => (
                  <div
                    className="col-7 col-lg-3 my-3 last-pr-item position-relative"
                    key={prod.id}
                    onClick={() =>
                      navigate(
                        `../product-details/${prod.id}`,
                        { state: prod }
                      )
                    }
                  >
                    <div className="product-container p-2 rounded-3 h-75">
                      <span className="text-black text-decoration-none">
                        <img
                          loading="lazy"
                          src={prod.image1}
                          alt="product"
                          className="w-100 h-100 rounded-4 object-fit-cover"
                        />
                        <h6 className="my-3">
                          {prod.name}
                        </h6>
                        <div className="d-flex px-1 position-absolute bottom-0">
                          <div className="mx-1 fw-bold">
                            {prod.price + "$"}
                          </div>
                          <div className="mx-1">
                            <strike>
                              {Math.round(
                                prod.price /
                                  prod.percentSalesOff
                              ) + "$"}
                            </strike>
                          </div>
                          <div className="mx-1">
                            <span className="bg-danger-subtle rounded-pill px-2 py-1">
                              {Math.round(
                                prod.percentSalesOff * 100
                              ) + "%"}
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default ProductDetail;
