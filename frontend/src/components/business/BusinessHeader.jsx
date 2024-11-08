function BusinessHeader({ name, rating, totalReviews, category }) {
  return (
    <div className="business-header">
      <h1>{name}</h1>
      <div className="rating">
        <span>{rating}</span>
        <span>({totalReviews} reviews)</span> {/* Use totalReviews here */}
      </div>
      <p>{category}</p>
    </div>
  );
}

export default BusinessHeader;