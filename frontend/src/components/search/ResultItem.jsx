import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from "../../utils/TextFormat";

function ResultItem({ id, name, rating, reviews, description, image }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <Link to={`/business/${id}`} className="result-item-link block text-inherit">
      <div className="result-item bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden w-full max-w-lg mx-auto border dark:border-white">
        <img
          src={image || placeholderImage}
          alt={"---"}
          className="w-full h-40 object-cover result-item-image"
        />
        <div className="p-4 text-center result-info">
          <h3 className="text-lg mb-2 text-gray-800 dark:text-white">{capitalizeFirstLetter(name)}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {rating ? (
              <>
                {`${parseFloat(rating).toFixed(1)} ⭐`}
                {reviews ? ` (${reviews} reviews)` : ""}
              </>
            ) : (
              "No ratings yet"
            )}
          </p>
          {description && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {description.length > 100
                ? `${description.substring(0, 100)}...`
                : description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ResultItem;
