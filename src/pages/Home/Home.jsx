// eslint-disable-next-line no-unused-vars
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOP_ITEMS } from "../../constants/common.constant";
import Loader from "../../components/Loader/Loader";
import { PRODUCTS } from "../../../public/data/data";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Loader />
      <Helmet>
        <title>MenWear</title>
      </Helmet>
      <div className="hero w-100 py-4">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-md-5">
              <h1 className="fw-bold">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-secondary">
                Browse through our diverse range of
                meticulously crafted garments, designed to
                bring out your individuality and cater to
                your sense of style.
              </p>
              <Link
                className="btn main-btn text-white rounded-pill p-3 fs-6 text-decoration-none"
                to="/shop"
              >
                View shop
              </Link>
              <div className="row mt-4">
                <div className="col-4">
                  <h1 className="fw-bold">50+</h1>
                  <p>Products</p>
                </div>
                <div className="col-4 border-start border-3 border-secondary-subtle">
                  <h1 className="fw-bold">5+</h1>
                  <p>Categories</p>
                </div>
                <div className="col-4 border-start border-3 border-secondary-subtle">
                  <h1 className="fw-bold">1500+</h1>
                  <p>Customers</p>
                </div>
              </div>
            </div>
            <div className="col-md-7 hero-main-img h-100" />
          </div>
        </div>
      </div>
      <section className="container my-5">
        {TOP_ITEMS.map((item) => (
          <div key={item.id}>
            <div className="w-100 text-center my-4">
              <h1 className="fw-bolder">{item.name}</h1>
            </div>
            <div className="row my-3 product-row overflow-x-hidden align-items-stretch last-products">
              {PRODUCTS.sort(() => Math.random() - 0.5)
                .slice(0, 4)
                .map((product) => (
                  <div
                    className="col-7 col-lg-3 my-3 last-pr-item position-relative pointer-cursor"
                    key={product.id}
                    onClick={() =>
                      navigate(
                        `/product-details/${product.id}`,
                        {
                          state: product,
                        }
                      )
                    }
                  >
                    <div className="product-container p-2 rounded-3 h-75">
                      <img
                        loading="lazy"
                        src={product.image1}
                        alt="product"
                        className="w-100 h-100 rounded-4 object-fit-cover"
                      />
                      <h6 className="mt-3 mb-5">
                        {product.name}
                      </h6>
                      <div className="d-flex align-items-center gap-2 px-1 position-absolute bottom-0">
                        <div
                          className="fw-bold"
                          data-item-type="price"
                        >
                          {`${product.price}$`}
                        </div>
                        <div className="d-flex align-items-center">
                          <strike className="text-secondary">
                            {Math.round(
                              product.price /
                                (1 -
                                  product.percentSalesOff)
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
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-100 text-center my-5">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-3">
                  <Link
                    to="/shop"
                    className="btn py-2 px-5 rounded-pill border border-1 w-100"
                  >
                    Show all
                  </Link>
                </div>
              </div>
            </div>
            <hr className="my-2" />
          </div>
        ))}

        <div className="row my-3 rounded-4 browse-container px-5 py-3">
          <div className="w-100 text-center my-4">
            <h1 className="fw-bolder">
              BROWSE BY dress STYLE
            </h1>
          </div>
          <div className="col-md-3 p-3">
            <a
              className="text-decoration-none"
              onClick={() => navigate(`shop?category=5`)}
            >
              <div className="browse-clothes shirt p-2 px-4 rounded-3 text-dark">
                <h1>Shirt</h1>
              </div>
            </a>
          </div>
          <div className="col-md-9 p-3">
            <a
              className="text-decoration-none"
              onClick={() => navigate(`shop?category=2`)}
            >
              <div className="browse-clothes t-shirt p-2 px-4 rounded-3 text-dark">
                <h1>T - Shirt</h1>
              </div>
            </a>
          </div>
          <div className="col-md-9 p-3">
            <a
              className="text-decoration-none"
              onClick={() => navigate(`shop?category=3`)}
            >
              <div className="browse-clothes polo p-2 px-4 rounded-3 text-white">
                <h1>Polo</h1>
              </div>
            </a>
          </div>
          <div className="col-md-3 p-3">
            <a
              className="text-decoration-none"
              onClick={() => navigate(`shop?category=10`)}
            >
              <div className="browse-clothes sport p-2 px-4 rounded-3 text-white">
                <h1>Sport</h1>
              </div>
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
