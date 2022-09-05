import React from "react";
import { homePageCategories } from "../../data";

export default function Categories({setSelectedCategory}) {
  return (
    <div className="categoryCont">
      {homePageCategories?.map((category, index) => (
        <div onClick={() => setSelectedCategory(category.url)} className="cateBox" key={index}>
          <img src={category.imgSrc} alt={category.text} />
          <span>{category.text}</span>
        </div>
      ))}
    </div>
  );
}
