import Review from './Review';

function ReviewsSection({ reviews }) {
  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>
      {reviews.map((review) => (
        <Review 
          key={review.id} 
          name={review.name} 
          rating={review.rating} 
          comment={review.comment} 
        />
      ))}
    </section>
  );
}

export default ReviewsSection;
