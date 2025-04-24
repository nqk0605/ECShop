/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useCart } from "../../context/cartContext/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    increaseProduct,
    decreaseProduct,
    deleteProduct,
    resetCart,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleItemSelect = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const selectedProducts = cart.filter(
    (item) => selectedItems[item.id]
  );

  const totalPrice = Number(
    selectedProducts
      .reduce((a, b) => a + b.price * b.quantity, 0)
      .toFixed(2)
  );

  const handlePay = () => {
    if (selectedProducts.length === 0) {
      toast.error(
        "Please select at least one product to checkout!"
      );
      return;
    }
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      navigate("/checkout", {
        state: {
          selectedProducts,
          totalPrice,
        },
      });
    }, 800);
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <ToastContainer />
      <Helmet>
        <title>Cart - MenWear</title>
      </Helmet>
      <div className="container-fluid p-0">
        <section className="container mb-5">
          <div className="cart">
            <div className="row">
              <div className="cart-main col-md-7 my-2">
                <div className="rounded-4 border border-1 py-3 px-4 position-relative overflow-x-hidden">
                  {cart.length > 0 &&
                    cart.map((product) => (
                      <div
                        className="cart-item position-relative rounded-4 px-1 my-2 py-1"
                        key={product.id}
                      >
                        <div className="row align-items-center">
                          <div className="col-3">
                            <Link
                              to={`/product-detail/${product.id}`}
                            >
                              <img
                                loading="lazy"
                                className="img-fluid w-100 rounded-3"
                                src={product.image1}
                                alt="cart-item"
                              />
                            </Link>
                          </div>
                          <div className="col-9">
                            <div className="d-flex w-100 align-items-center">
                              <div className="flex-grow-1 d-flex align-items-center">
                                <div className="form-check me-3">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={
                                      selectedItems[
                                        product.id
                                      ] || false
                                    }
                                    onChange={() =>
                                      handleItemSelect(
                                        product.id
                                      )
                                    }
                                  />
                                </div>
                                <h1 className="fs-4 fw-bold mb-0">
                                  <span className="text-decoration-none text-black">
                                    {product.name}
                                  </span>
                                </h1>
                              </div>
                              <div>
                                <button
                                  className="btn fs-4 text-danger del-btn"
                                  onClick={() =>
                                    deleteProduct(
                                      product.id
                                    )
                                  }
                                >
                                  <i className="bi bi-trash-fill" />
                                </button>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <div className="d-flex">
                                <h1 className="fs-5 fw-bold">
                                  {product.price + "$"}
                                </h1>
                                <div className="d-flex">
                                  <div className="mx-1">
                                    <strike>
                                      {Math.round(
                                        product.price /
                                          (1 -
                                            product.percentSalesOff)
                                      ) + "$"}
                                    </strike>
                                  </div>
                                  <div className="mx-1">
                                    <span className="bg-danger-subtle rounded-pill px-2 py-1">
                                      {Math.round(
                                        product.percentSalesOff *
                                          100
                                      ) + "%"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="me-3 text-secondary">
                                  Size:{" "}
                                  {product.size || "M"}
                                </span>
                                <div className="d-flex">
                                  <div className="mx-1">
                                    <button
                                      className="btn fs-5 rounded-pill"
                                      onClick={() =>
                                        increaseProduct(
                                          product.id
                                        )
                                      }
                                    >
                                      <i className="bi bi-plus" />
                                    </button>
                                  </div>
                                  <div className="mx-1 text-secondary">
                                    {product.quantity}
                                  </div>
                                  <div className="mx-1">
                                    <button
                                      className="btn fs-5 rounded-pill"
                                      onClick={() =>
                                        decreaseProduct(
                                          product.id
                                        )
                                      }
                                      disabled={
                                        product.quantity ===
                                        0
                                      }
                                    >
                                      <i className="bi bi-dash" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-md-5 my-2">
                <div className="order-summery border border-1 rounded-4 py-3 px-4">
                  <div className="order-summery">
                    <h1 className="fs-4 fw-bold">
                      Order summary
                    </h1>
                  </div>
                  <div className="order-price">
                    <div className="w-100 d-flex mt-4 my-2 fs-5">
                      <div className="flex-grow-1">
                        Selected Items
                      </div>
                      <div className="text-secondary">
                        {selectedProducts.length} /{" "}
                        {cart.length}
                      </div>
                    </div>
                    <div className="w-100 d-flex mt-4 my-2 fs-5">
                      <div className="flex-grow-1">
                        Total Price
                      </div>
                      <div className="text-secondary">
                        {totalPrice + " $"}
                      </div>
                    </div>
                    {selectedProducts.length > 0 && (
                      <div className="w-100 d-flex my-3 fs-5">
                        <div className="flex-grow-1">
                          Shipment cost
                        </div>
                        <div className="text-secondary">
                          3 $
                        </div>
                      </div>
                    )}
                    <hr />
                    <div className="w-100 d-flex my-3 fs-5 fw-bold">
                      <div className="flex-grow-1">
                        Total
                      </div>
                      <div className="text-secondary">
                        {`${
                          totalPrice +
                          (selectedProducts.length > 0
                            ? 3
                            : 0)
                        } $`}
                      </div>
                    </div>
                    <div className="w-100 mt-4 my-2">
                      <button
                        className={`btn main-btn text-white w-100 px-6 py-3 rounded-pill ${
                          selectedProducts.length === 0
                            ? "disabled"
                            : ""
                        }`}
                        onClick={handlePay}
                        disabled={
                          selectedProducts.length === 0 ||
                          isLoading
                        }
                      >
                        {isLoading ? (
                          <span>
                            <i className="bi bi-hourglass-split me-2"></i>
                            Processing...
                          </span>
                        ) : (
                          <span>
                            Proceed to Checkout
                            <i className="bi bi-arrow-right ms-2"></i>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Cart;
