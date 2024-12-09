import { Link } from 'react-router-dom';

function ResultItem({ id, name, category, rating, reviews, description, image }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <Link to={`/business/${id}`} className="block text-inherit">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden w-full max-w-lg mx-auto border dark:border-white">
        <img 
          src={image || placeholderImage} 
          alt={name} 
          className="w-full h-40 object-cover" 
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{category}</p>
          <p className="text-gray-600 dark:text-gray-300">{rating} ⭐ ({reviews} reviews)</p>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ResultItem;