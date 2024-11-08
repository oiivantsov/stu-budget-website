function Review({ name, rating, comment }) {
    return (
      <div className="review">
        <p><strong>{name}</strong> <span>{rating}</span></p>
        <p>{comment}</p>
      </div>
    );
  }
  
  export default Review;
  