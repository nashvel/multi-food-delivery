import React, { useState, useEffect } from "react";
import "./myOrders.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  // Mock orders for frontend-only testing
  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        items: [
          { name: "Burger", quantity: 2 },
          { name: "Fries", quantity: 1 },
        ],
        amount: 299,
        status: "Preparing",
        payment: false,
        cod: true,
      },
      {
        id: 2,
        items: [{ name: "Pizza", quantity: 1 }],
        amount: 499,
        status: "Out for Delivery",
        payment: true,
        cod: false,
      },
    ];
    setOrders(mockOrders);
  }, []);

  return (
    <>
      {orders.length === 0 ? (
        <div className="my-order-signout">
          <img src={assets.my_order} alt="Empty Orders" />
          <p>Your Order history is empty.</p>
        </div>
      ) : (
        <div className="my-orders">
          <h2>My Orders</h2>
          <div className="container">
            {orders
              .slice() // Prevent mutating original array
              .reverse()
              .map((order) => (
                <div key={order.id} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="parcel" />

                  <p>
                    {order.items
                      .map((item) => `${item.name} x${item.quantity}`)
                      .join(", ")}
                  </p>
                  <p>₱{order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span>&#x25cf;</span> &nbsp;
                    <b>{order.status}</b>
                  </p>

                  {order.cod ? (
                    <p>
                      <b>Cash on Delivery</b>
                    </p>
                  ) : (
                    <p>
                      <b className="text-black">Paid</b>
                    </p>
                  )}
                  <button onClick={() => toast.info("Tracking order...")}>
                    Track Order
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrders;
