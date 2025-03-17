import React, { useContext, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { getTotalCartAmount, food_list, cartItems, promoApplied } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [codLoading, setCodLoading] = useState(false);
  const [data, setData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    apartmentNo: "12B",
    city: "Metro Manila",
    area: "Makati",
    street: "Ayala Ave",
    landmark: "Near Greenbelt",
    phone: "09123456789",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const simulateOrderProcessing = (paymentMethod) => {
    setLoading(paymentMethod === "online");
    setCodLoading(paymentMethod === "cod");

    setTimeout(() => {
      toast.success(`Order placed successfully using ${paymentMethod.toUpperCase()}!`);
      setLoading(false);
      setCodLoading(false);
    }, 2000);
  };

  return (
    <>
      {getTotalCartAmount() > 0 ? (
        <form className="place-order" onSubmit={(e) => e.preventDefault()}>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input required name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder="Full Name" />
            </div>
            <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" />
            <input required name="apartmentNo" value={data.apartmentNo} onChange={onChangeHandler} type="text" placeholder="Apartment no/name" />
            <div className="multi-fields">
              <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
              <input required name="area" value={data.area} onChange={onChangeHandler} type="text" placeholder="Locality" />
            </div>
            <div className="multi-fields">
              <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
              <input name="landmark" value={data.landmark} onChange={onChangeHandler} type="text" placeholder="Landmark" />
            </div>
            <input required name="phone" value={data.phone} onChange={onChangeHandler} type="number" placeholder="Phone Number" />
          </div>
          <div className="place-order-right">
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
                {promoApplied && (
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
                  <p>₱{promoApplied ? getTotalCartAmount() + 5 : getTotalCartAmount() + 25 + 5}</p>
                </div>
              </div>
              <button className="pay-online" onClick={() => simulateOrderProcessing("online")}>
                {loading ? "Processing..." : "Pay Online"} <img src={assets.card} /> <img src={assets.upi} />
              </button>
              <div className="cod">
                <button className="cod-btn pay-online" onClick={() => simulateOrderProcessing("cod")}>
                  {codLoading ? "Processing..." : "Cash On Delivery"}
                </button>
                <p>(This option will place your order).</p>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="empty-cart">
          <img src={assets.empty_cart} alt="empty cart" />
          <h2>Your cart is Empty.</h2>
          <p>Looks like you have not added anything to your cart. Go ahead and explore top categories.</p>
        </div>
      )}
    </>
  );
}

export default PlaceOrder;
