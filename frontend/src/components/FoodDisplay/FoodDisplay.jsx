import React, { useContext, useState } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list, loading } = useContext(StoreContext);
  const [sortOrder, setSortOrder] = useState("asc");
  const [vegOnly, setVegOnly] = useState(false);

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const handleVegSwitch = () => {
    setVegOnly((prev) => !prev);
  };

  // Filter and sort food items
  const filteredFoodList = food_list
    ?.filter((item) => (vegOnly ? item.veg : true)) 
    .filter((item) => category === "All" || category === item.category) 
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  console.log("Filtered Food List:", filteredFoodList); // Debugging log

  return (
    <>
      <br />
      <div className="title">
        <h2>Top Dishes</h2>
        {!loading && (
          <div className="controls">
            <div className="sort-container">
              <select id="sort" value={sortOrder} onChange={handleSort}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <div className="veg-switch">
              <label>
                <input type="checkbox" checked={vegOnly} onChange={handleVegSwitch} />
                Veg Only
              </label>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="food-display" id="food-display">
          <div className="food-display-list">
            {filteredFoodList.length > 0 ? (
              filteredFoodList.map((item) => (
                <FoodItem
                  key={item.id || item._id} 
                  id={item.id || item._id}  
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  category={item.category}
                  available={true}
                  veg={item.veg}
                />
              ))
            ) : (
              <div className="no-food">
                <h6>:(</h6>
                <p>No food items available in this category.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FoodDisplay;
