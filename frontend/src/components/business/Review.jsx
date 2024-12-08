function Review({ id, userName, rating, comment}) {

  return (
    <div className="review">
      <p>
        <strong>{userName}</strong> - <span>{rating} ⭐</span>
      </p>
      <p>{comment}</p>
    </div>
  );
}

export default Review;
