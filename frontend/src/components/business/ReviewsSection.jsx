import Review from './Review';

function ReviewsSection({ reviews }) {
  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review.id || review._id}
            id={review.id || review._id}
            userName={review.user.username}
            rating={review.rating}
            comment={review.comment}
          />
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </section>
  );
}

export default ReviewsSection;
