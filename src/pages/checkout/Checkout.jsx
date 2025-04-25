/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../../context/cartContext/cartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, resetCart } = useCart();
  const [paymentMethod, setPaymentMethod] =
    useState("direct_bank");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get selected products from navigation state
  const selectedProducts = useMemo(
    () => location.state?.selectedProducts || [],
    [location.state]
  );
  const totalPrice = useMemo(
    () => location.state?.totalPrice || 0,
    [location.state]
  );

  useEffect(() => {
    // If no products were selected, redirect back to cart
    if (selectedProducts.length === 0) {
      navigate("/cart");
    }
  }, [selectedProducts, navigate]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Get all required form inputs
    const form = e.target;
    const requiredInputs = form.querySelectorAll(
      "input[required], select[required]"
    );
    console.log("Required inputs:", requiredInputs.length);
    let emptyFields = [];

    requiredInputs.forEach((input) => {
      console.log(
        "Checking input:",
        input.name,
        input.value
      );
      if (!input.value.trim()) {
        const label =
          input.previousElementSibling?.textContent
            ?.trim()
            .replace(" *", "") || "Required field";
        emptyFields.push(label);
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    });

    console.log("Empty fields:", emptyFields);
    if (emptyFields.length > 0) {
      toast.error(
        `Please fill in the following required fields: ${emptyFields.join(
          ", "
        )}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        }
      );
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // Get the products that were not selected for checkout
      const remainingProducts = cart.filter(
        (item) =>
          !selectedProducts.some(
            (selected) => selected.id === item.id
          )
      );

      // Update cart with remaining products
      resetCart(remainingProducts);

      // Show success toast
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      // Reset processing state and redirect to home after a delay
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="container py-5">
      <Helmet>
        <title>Checkout - MenWear</title>
      </Helmet>
      <ToastContainer />

      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handlePlaceOrder}>
            <div className="billing-details">
              <h3 className="mb-4 fw-bold">
                BILLING DETAILS
              </h3>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    First name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Last name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Country / Region *
                </label>
                <select className="form-select" required>
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="JP">Japan</option>
                  <option value="KR">South Korea</option>
                  <option value="CN">China</option>
                  <option value="IN">India</option>
                  <option value="BR">Brazil</option>
                  <option value="MX">Mexico</option>
                  <option value="AR">Argentina</option>
                  <option value="RU">Russia</option>
                  <option value="ZA">South Africa</option>
                  <option value="NG">Nigeria</option>
                  <option value="EG">Egypt</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="AE">
                    United Arab Emirates
                  </option>
                  <option value="TR">Turkey</option>
                  <option value="PL">Poland</option>
                  <option value="NL">Netherlands</option>
                  <option value="BE">Belgium</option>
                  <option value="SE">Sweden</option>
                  <option value="NO">Norway</option>
                  <option value="DK">Denmark</option>
                  <option value="FI">Finland</option>
                  <option value="IE">Ireland</option>
                  <option value="PT">Portugal</option>
                  <option value="GR">Greece</option>
                  <option value="IL">Israel</option>
                  <option value="SG">Singapore</option>
                  <option value="MY">Malaysia</option>
                  <option value="TH">Thailand</option>
                  <option value="VN">Vietnam</option>
                  <option value="ID">Indonesia</option>
                  <option value="PH">Philippines</option>
                  <option value="NZ">New Zealand</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="HU">Hungary</option>
                  <option value="RO">Romania</option>
                  <option value="UA">Ukraine</option>
                  <option value="HR">Croatia</option>
                  <option value="BG">Bulgaria</option>
                  <option value="RS">Serbia</option>
                  <option value="SK">Slovakia</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Street address *
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="House number and street name"
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Town / City *
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn main-btn text-white px-5 py-3 mt-4 w-100"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>
                  <i className="bi bi-hourglass-split me-2"></i>
                  Processing Order...
                </span>
              ) : (
                <span>
                  PLACE ORDER
                  <i className="bi bi-arrow-right ms-2"></i>
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="order-summary p-4 bg-light rounded-4">
            <h3 className="mb-4 fw-bold">YOUR ORDER</h3>

            <div className="d-flex justify-content-between mb-3">
              <h6 className="text-muted">PRODUCT</h6>
              <h6 className="text-muted">SUBTOTAL</h6>
            </div>

            {selectedProducts.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span className="text-secondary">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-secondary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">
                Subtotal
              </span>
              <span className="text-secondary">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">
                Shipping
              </span>
              <span className="text-secondary">$3.00</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <strong>Total</strong>
              <strong>
                ${(totalPrice + 3).toFixed(2)}
              </strong>
            </div>

            <hr className="my-4" />

            <h3 className="mb-4 fw-bold">PAYMENT METHOD</h3>

            <div className="form-check mb-3">
              <input
                type="radio"
                className="form-check-input"
                id="direct_bank"
                name="payment_method"
                checked={paymentMethod === "direct_bank"}
                onChange={() =>
                  setPaymentMethod("direct_bank")
                }
              />
              <label
                className="form-check-label"
                htmlFor="direct_bank"
              >
                Direct bank transfer
              </label>
              {paymentMethod === "direct_bank" && (
                <div className="payment-info mt-2 text-muted">
                  Make your payment directly into our bank
                  account. Please use your Order ID as the
                  payment reference. Your order will not be
                  shipped until the funds have cleared in
                  our account.
                </div>
              )}
            </div>

            <div className="form-check mb-3">
              <input
                type="radio"
                className="form-check-input"
                id="check_payment"
                name="payment_method"
                checked={paymentMethod === "check"}
                onChange={() => setPaymentMethod("check")}
              />
              <label
                className="form-check-label"
                htmlFor="check_payment"
              >
                Check payments
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                type="radio"
                className="form-check-input"
                id="cash_delivery"
                name="payment_method"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              <label
                className="form-check-label"
                htmlFor="cash_delivery"
              >
                Cash on delivery
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
