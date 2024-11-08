import { Link } from 'react-router-dom';

function ResultItem({ name, category, rating, reviews, description, image }) {
  return (
    <Link to="/business" className="result-item-link">
      <div className="result-item">
        <img src={image} alt={name} />
        <div className="result-info">
          <h3>{name}</h3>
          <p>{category}</p>
          <p className="rating">{rating} ({reviews} reviews)</p>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ResultItem;
