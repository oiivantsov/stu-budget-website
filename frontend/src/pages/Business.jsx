import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BusinessHeader from '../components/business/BusinessHeader';
import Images from '../components/business/Images';
import Address from '../components/business/Address';
import ReviewsSection from '../components/business/ReviewsSection';
import WriteReviewModal from '../components/WriteReviewModal';
import { fetchCafeById } from '../utils/CafesAPI';
import { uploadImage } from '../utils/CafesAPI';
import { capitalizeFirstLetter } from '../utils/TextFormat';

function Business() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const data = await fetchCafeById(id);
        setBusinessData(data);
        setReviews(data.reviews || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadBusiness();
  }, [id]);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleImageUpload = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
        return;
    }

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
        setUploading(true);
        const response = await uploadImage(formData, "674c6f2b3fb59690905a6d44", id); // Replace with actual user ID
        console.log("Response msg:", response.msg);
        // Optionally refresh the images in the UI
        setBusinessData((prevData) => ({
            ...prevData,
            images: [...prevData.images, response.newImage], // Ensure the backend returns the new image in the response
        }));
    } catch (err) {
        console.error("Error uploading image:", err.message);
    } finally {
        setUploading(false);
    }
};



  if (loading) return <p>Loading business details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!businessData) return <p>Business not found.</p>;

  return (
    <section className="business-details">
      <button className="btn btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <BusinessHeader
        name={capitalizeFirstLetter(businessData.name)}
        rating={businessData.reviewsAverage}
        totalReviews={businessData.reviewsTotal}
      />

      <div className="button-group">
        <button className="btn btn-review" onClick={openReviewModal}>
          Write a Review
        </button>
        <label className="btn btn-upload">
          Add Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>
        <button className="btn btn-favorite">Add to Favorites</button>
        <button className="btn btn-share">Share</button>
      </div>

      <div className="business-info">
        <Images images={businessData.images} />
        {uploading && <p>Uploading image...</p>}
        <Address
          address={{
            street: capitalizeFirstLetter(businessData.address),
            city: capitalizeFirstLetter(businessData.city),
            postal: businessData.postal_code,
            country: "Finland",
          }}
          coordinates={{
            lat: businessData.latitude,
            long: businessData.longitude,
          }}
          phone={businessData.phone}
          website={businessData.website}
        />
      </div>

      <ReviewsSection reviews={reviews} />

      {isReviewModalOpen && (
        <WriteReviewModal closeModal={closeReviewModal} addReview={addReview} cafeId={id} />
      )}
    </section>
  );
}

export default Business;
