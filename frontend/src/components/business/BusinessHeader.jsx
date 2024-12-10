function BusinessHeader({ name, rating, totalReviews, category }) {
  return (
    <header className="business-header">
      <h1>{name}</h1>
      <div className="rating">
        <span>{rating
          ? `${parseFloat(rating).toFixed(1)}`
          : "No ratings"} ⭐</span>
        <span>({totalReviews} reviews)</span>
      </div>
      <p>{category}</p>
    </header>
  );
}

export default BusinessHeader;
