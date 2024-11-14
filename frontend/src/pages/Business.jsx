import React, { useState } from 'react';
import BusinessHeader from '../components/business/BusinessHeader';
import Images from '../components/business/Images';
import Address from '../components/business/Address';
import ReviewsSection from '../components/business/ReviewsSection';
import WriteReviewModal from '../components/WriteReviewModal';
import businessData from '../data/businessData';

function Business() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState(businessData.reviews);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <section className="business-details">
      <BusinessHeader
        name={businessData.name}
        rating={businessData.rating}
        totalReviews={reviews.length}
        category={businessData.category}
      />
      
      <div className="button-group">
        <button className="btn btn-review" onClick={openReviewModal}>Write a Review</button>
        <button className="btn btn-favorite">Add to Favorites</button>
        <button className="btn btn-share">Share</button>
      </div>

      <div className="business-info">
        <Images images={businessData.images} />
        <Address address={businessData.address} />
      </div>

      <ReviewsSection reviews={reviews} />
      
      {isReviewModalOpen && (
        <WriteReviewModal closeModal={closeReviewModal} addReview={addReview} />
      )}
    </section>
  );
}

export default Business;
