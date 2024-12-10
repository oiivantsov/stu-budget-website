import { Link } from 'react-router-dom';

function ResultItem({ id, name, category, rating, reviews, description, image }) {
  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <Link to={`/business/${id}`} className="result-item-link">
      <div className="result-item">
        <img
          src={image || placeholderImage}
          alt={name}
          className="result-item-image"
        />
        <div className="result-info">
          <h3>{name}</h3>
          <p>{category}</p>
          <p
            className="rating">
            {rating
              ? `${parseFloat(rating).toFixed(1)}`
              : "No ratings"}
            ⭐
            ({reviews} reviews)
          </p>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ResultItem;
