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
import { Helmet } from "react-helmet";

const ProductDetail = () => {
  const { state } = useLocation();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M"); // Default size M
  const sizes = ["S", "M", "L", "XL", "2XL"];

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
    addToCart({
      ...product,
      quantity: 1,
      size: selectedSize,
    });
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
      <Helmet>
        <title>{product.name} - MenWear</title>
      </Helmet>
      <div className="container-fluid p-0">
        <section className="container mb-5">
          <hr />
          <div className="row align-items-stretch justify-content-center">
            <div className="col-12" />
            {/* Desktop Image Gallery */}
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
            {/* Main Product Image */}
            <div className="col-12 col-sm-12 col-md-4">
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
            {/* Mobile Image Gallery */}
            <div className="col-12 d-flex d-lg-none justify-content-center my-3">
              <div
                className="d-flex gap-2"
                style={{
                  maxWidth: "100%",
                  overflowX: "auto",
                  padding: "0 10px",
                }}
              >
                <img
                  src={product.image1}
                  alt="product"
                  className={`rounded-4 pointer-cursor gallery-img-mobile ${
                    activeImage === 1
                      ? "border border-dark"
                      : "opacity-50"
                  }`}
                  onClick={() => setActiveImage(1)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={product.image2}
                  alt="product"
                  className={`rounded-4 pointer-cursor gallery-img-mobile ${
                    activeImage === 2
                      ? "border border-dark"
                      : "opacity-50"
                  }`}
                  onClick={() => setActiveImage(2)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={product.image3}
                  alt="product"
                  className={`rounded-4 pointer-cursor gallery-img-mobile ${
                    activeImage === 3
                      ? "border border-dark"
                      : "opacity-50"
                  }`}
                  onClick={() => setActiveImage(3)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            {/* Product Details */}
            <div className="col-12 col-sm-12 col-md-7">
              <div className="h-100 py-2 px-3">
                <div className="my-2">
                  <h1 className="fs-2 fw-bold">
                    {product.name}
                  </h1>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="fw-bold fs-4"
                    data-item-type="price"
                  >
                    {`${product.price}$`}
                  </div>
                  <div className="d-flex align-items-center">
                    <strike className="text-secondary">
                      {Math.round(
                        product.price /
                          (1 - product.percentSalesOff)
                      ) + "$"}
                    </strike>
                  </div>
                  <div>
                    <span className="bg-danger-subtle rounded-pill px-2 py-1">
                      {Math.round(
                        product.percentSalesOff * 100
                      ) + "%"}
                    </span>
                  </div>
                </div>

                <div className="my-3">
                  <p className="text-secondary">
                    {product.description}
                  </p>
                </div>
                <hr />
                <div className="my-3">
                  <h6 className="mb-3">Select Size:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`btn rounded-pill ${
                          selectedSize === size
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                        style={{ minWidth: "60px" }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <hr />
                <div className="my-2">
                  <div className="px-2">
                    <button
                      className="btn main-btn py-2 text-white rounded-pill w-100 my-2 bg-alternative"
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
              <div className="row g-3 justify-content-center">
                {showSimilarProducts.map((prod) => (
                  <div
                    className="col-12 col-sm-6 col-lg-3"
                    key={prod.id}
                    onClick={() =>
                      navigate(
                        `../product-details/${prod.id}`,
                        { state: prod }
                      )
                    }
                  >
                    <div className="product-container p-2 rounded-3 h-100 position-relative">
                      <div
                        className="mb-3 position-relative"
                        style={{ paddingTop: "100%" }}
                      >
                        <img
                          loading="lazy"
                          src={prod.image1}
                          alt="product"
                          className="w-100 h-100 rounded-4 object-fit-cover position-absolute top-0 start-0"
                          style={{
                            objectPosition: "center",
                          }}
                        />
                      </div>
                      <div className="text-black text-decoration-none">
                        <h6 className="mb-3">
                          {prod.name}
                        </h6>
                        <div className="d-flex">
                          <h1 className="fs-5 fw-bold mb-0">
                            {prod.price + "$"}
                          </h1>
                          <div className="d-flex">
                            <div className="mx-1">
                              <strike>
                                {Math.round(
                                  prod.price /
                                    (1 -
                                      prod.percentSalesOff)
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
                        </div>
                      </div>
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
