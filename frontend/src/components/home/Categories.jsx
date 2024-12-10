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
        en: "Most Liked",
        fi: "Eniten Tykkäyksiä",
        sv: "Mest Gillade"
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
    <section className="categories py-8 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          {language === "en" ? "Explore Top Picks" : language === "fi" ? "Tutustu Suosikkeihin" : "Utforska Toppval"}
        </h2>
        <div className="category-cards grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Most Liked */}
          <div
            className="category-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 text-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            onClick={() => handleCategoryClick("mostLiked")}
          >
            <img
              src={favorite}
              alt="Most Liked"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 object-contain"
            />
            <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              {getCategoryText("mostLiked")}
            </span>
          </div>
          {/* Most Reviewed */}
          <div
            className="category-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            onClick={() => handleCategoryClick("mostReviewed")}
          >
            <img
              src={reviewed}
              alt="Most Reviewed"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 object-contain"
            />
            <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              {getCategoryText("mostReviewed")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;