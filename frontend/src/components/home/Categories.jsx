import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import favorite from "../../assets/images/categories/favorite.png";
import reviewed from "../../assets/images/categories/star.png";

function Categories() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleCategoryClick = (type) => {
    navigate("/search", { state: { filterType: type } });
  };  

  const getCategoryText = (type) => {
    const texts = {
      mostLiked: {
        en: "Top Rated",
        fi: "Parhaat Arviot",
        sv: "Högst Betyg"
      },
      mostReviewed: {
        en: "Most Reviewed",
        fi: "Eniten Arvosteluja",
        sv: "Mest Recenserade"
      }
    };
    return texts[type][language];
  };

  return (
    <section className="categories py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {language === "en" ? "Explore Top Picks" : language === "fi" ? "Tutustu Suosikkeihin" : "Utforska Toppval"}
        </h2>
        <div className="category-cards grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Most Liked */}
          <div
            className="category-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleCategoryClick("mostLiked")}
          >
            <img
              src={favorite} // Replace with your image path
              alt="Most Liked"
              className="w-24 h-24 mx-auto mb-4"
            />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{getCategoryText("mostLiked")}</span>
          </div>
          {/* Most Reviewed */}
          <div
            className="category-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleCategoryClick("mostReviewed")}
          >
            <img
              src={reviewed} // Replace with your image path
              alt="Most Reviewed"
              className="w-24 h-24 mx-auto mb-4"
            />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{getCategoryText("mostReviewed")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;