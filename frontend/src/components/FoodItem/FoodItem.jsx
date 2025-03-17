import React, { useContext } from "react";
import "./foodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image, category, available }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  if (!id) {
    console.warn("FoodItem is missing an ID:", { name, category });
    return null; // Prevent rendering without an ID
  }

  return (
    <div className={`food-item ${available ? "" : "unavailable"}`}>
      <div className="food-item-img-container">
        {!available && (
          <div className="item-unavailable-wrapper">
            <p className="item-unavailable">Sorry, this item is currently unavailable</p>
          </div>
        )}
        <img className="food-item-image" src={image || assets.placeholder} alt={name} />

        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            className="add"
            onClick={() => {
              console.log("Adding to cart:", id);
              addToCart(id);
            }}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
<img className="remove-icon" onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
<p>{cartItems[id]}</p>
<img className="add-icon" onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />

          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-price-rating-wrapper">
          <p className="food-item-price">₱{price}</p>
          <p className="bubble">{category}</p>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
