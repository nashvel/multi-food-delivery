import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    promoApplied,
    applyPromoC,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [validPromo, setValidPromo] = useState("");

  useEffect(() => {
    if (promo === "NASHGWAPO" && getTotalCartAmount() >= 150) {
      setValidPromo("Promo code applied successfully!");
      applyPromoC(true);
    } else if (promo === "NASHGWAPO") {
      setValidPromo("Cart value must be more than ₱150 to avail this offer!");
      applyPromoC(false);
    }
  }, [cartItems, promo, getTotalCartAmount, applyPromoC]);

  const applyPromo = () => {
    if (promo === "NASHGWAPO" && getTotalCartAmount() >= 150) {
      setValidPromo("Promo code applied successfully!");
      applyPromoC(true);
    } else {
      setValidPromo(promo === "NASHGWAPO" ? 
        "Cart value must be more than ₱150 to avail this offer!" : "Invalid Promo code.");
      applyPromoC(false);
    }
  };

  return (
    <>
      {getTotalCartAmount() > 0 ? (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item) =>
              cartItems[item._id] > 0 ? (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="product" />
                    <p>{item.name}</p>
                    <p>₱{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₱{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                  </div>
                  <hr />
                </div>
              ) : null
            )}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₱{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee + gst</p>
                  <p>₱25</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Platform Fee</p>
                  <p>₱5</p>
                </div>
                {promoApplied && getTotalCartAmount() >= 150 && (
                  <>
                    <hr />
                    <div className="cart-total-details">
                      <p>Discount</p>
                      <p>- ₱25</p>
                    </div>
                  </>
                )}
                <hr />
                <div className="cart-total-details">
                  <p>Total</p>
                  <p>₱{getTotalCartAmount() + 25 + 5 - (promoApplied ? 25 : 0)}</p>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, enter it here.</p>
                <div className="cart-promocode-input">
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="NASHGWAPO"
                  />
                  <button onClick={applyPromo}>Submit</button>
                </div>
                <p>{validPromo}</p>
              </div>
              {!promoApplied && (
                <div className="promo-info">
                  <p>
                    O hi! Since you are here, delivery charges are on us! Apply
                    "NASHGWAPO" code to avail the offer! Cart value must be ₱150 or above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={assets.empty_cart} alt="Empty Cart" />
          <h2>Your cart is Empty.</h2>
          <p>
            Looks like you have not added anything to your cart. Go ahead and
            explore top categories.
          </p>
        </div>
      )}
    </>
  );
}

export default Cart;
