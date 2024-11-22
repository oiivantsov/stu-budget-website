import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BusinessHeader from '../components/business/BusinessHeader';
import Images from '../components/business/Images';
import Address from '../components/business/Address';
import ReviewsSection from '../components/business/ReviewsSection';
import WriteReviewModal from '../components/WriteReviewModal';
import { businesses } from '../data/businesses';

function Business() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const businessData = businesses.find((business) => business.id === parseInt(id, 10));

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState(businessData ? businessData.reviews.ratings : []);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  if (!businessData) {
    return <div>Business not found.</div>;
  }

  return (
    <section className="business-details">
      <button className="btn btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <BusinessHeader
        name={businessData.name}
        rating={businessData.reviews.average}
        totalReviews={businessData.reviews.total}
        category={businessData.category}
      />

      <div className="button-group">
        <button className="btn btn-review" onClick={openReviewModal}>Write a Review</button>
        <button className="btn btn-favorite">Add to Favorites</button>
        <button className="btn btn-share">Share</button>
      </div>

      <div className="business-info">
        <Images images={businessData.images} />
        <Address 
          address={businessData.address} 
          coordinates={businessData.coordinates} 
          phone={businessData.phone}
          website={businessData.website}
        />
      </div>

      <ReviewsSection reviews={reviews} />

      {isReviewModalOpen && (
        <WriteReviewModal closeModal={closeReviewModal} addReview={addReview} />
      )}
    </section>
  );
}

export default Business;
