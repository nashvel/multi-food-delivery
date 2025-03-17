import React from "react";
import "./exploreMenu.css";
import { menu_list } from "../../assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          We offer a diverse menu featuring everything from momos to noodles, rice, and more—all with a Chinese flair. We also have a selection of special drinks. Explore and choose from our wide array of options!
        </p>

        {/* First Section */}
        <h1>HarGems Korean Foodies</h1>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={`first-${index}`}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu_image"
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        <hr />

        {/* Second Section - Duplicate
        <h1>Client 2 Chinese Foodies</h1>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={`second-${index}`}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu_image"
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div> */}

        <hr />
      </div>
    </>
  );
}

export default ExploreMenu;
