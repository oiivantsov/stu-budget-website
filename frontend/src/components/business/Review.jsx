function Review({ id, userName, rating, comment}) {

  return (
    <div className="review">
      <p>
        <strong>{userName}</strong> - <span>{rating
              ? `${parseFloat(rating).toFixed(1)}`
              : "No ratings"} ⭐</span>
      </p>
      <p>{comment}</p>
    </div>
  );
}

export default Review;
