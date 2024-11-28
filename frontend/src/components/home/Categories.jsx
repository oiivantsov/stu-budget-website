import React from "react";
import { useNavigate } from "react-router-dom";
import favorite from "../../assets/images/categories/favorite.png";
import reviewed from "../../assets/images/categories/star.png";

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (type) => {
    navigate("/search", { state: { filterType: type } });
  };

  return (
    <section className="categories">
      <h2>Explore Top Picks</h2>
      <div className="category-cards">
        {/* Most Liked */}
        <div
          className="category-card"
          onClick={() => handleCategoryClick("mostLiked")}
        >
          <img
            src={favorite} // Replace with your image path
            alt="Most Liked"
          />
          <span>Most Liked</span>
        </div>
        {/* Most Reviewed */}
        <div
          className="category-card"
          onClick={() => handleCategoryClick("mostReviewed")}
        >
          <img
            src={reviewed} // Replace with your image path
            alt="Most Reviewed"
          />
          <span>Most Reviewed</span>
        </div>
      </div>
    </section>
  );
}

export default Categories;
