import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BusinessHeader from "../components/business/BusinessHeader";
import Images from "../components/business/Images";
import Address from "../components/business/Address";
import ReviewsSection from "../components/business/ReviewsSection";
import WriteReviewModal from "../components/WriteReviewModal";
import { fetchCafeById } from "../utils/CafesAPI";
import { uploadImage } from "../utils/CafesAPI";
import { capitalizeFirstLetter } from "../utils/TextFormat";
import LoginPromptModal from "../components/LoginPromptModal";
import useAddToFavorites from "../hooks/useAddToFavorites";
import { InfinitySpin } from 'react-loader-spinner';
import { LanguageContext } from "../context/LanguageContext";

import {
  fetchReviewsForRestaurant,
  addReview as addReviewAPI,
} from "../utils/ReviewsAPI";

function Business() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const [businessData, setBusinessData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // dialog to login or sign up if user is not logged in
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const hasUserReviewed = reviews.some((review) => review.user._id === userId);
  const {
    addToFavorites,
    loading: addingToFavorites,
    error: addToFavoritesError,
  } = useAddToFavorites(token);

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const data = await fetchCafeById(id);
        setBusinessData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviewsForRestaurant(id);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Failed to fetch reviews:", err.message);
      }
    };

    loadBusiness();
    loadReviews();
  }, [id]);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const addReview = async (newReview) => {
    try {
      await addReviewAPI(newReview);

      const data = await fetchCafeById(id);
      setBusinessData(data);

      const reviewsData = await fetchReviewsForRestaurant(id);
      setReviews(reviewsData);

      closeReviewModal();
    } catch (err) {
      console.error("Failed to add review:", err.message);
    }
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
      const response = await uploadImage(formData, userId, id); // Replace with actual user ID
      setBusinessData((prevData) => ({
        ...prevData,
        images: [...prevData.images, response.img],
      }));
    } catch (err) {
      console.error("Error uploading image:", err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAddToFavorites = (event) => {
    if (!token) {
      event.preventDefault();
      setIsLoginPromptOpen(true);
    } else {
      addToFavorites(id);
    }
  };

  const handleModalClose = (action) => {
    setIsLoginPromptOpen(false);
  };

  const getText = (key) => {
    const texts = {
      addToFavorites: {
        en: "Add to Favorites",
        fi: "Lisää suosikkeihin",
        sv: "Lägg till i favoriter",
      },
      writeReview: {
        en: "Write a Review",
        fi: "Kirjoita arvostelu",
        sv: "Skriv en recension",
      },
      reviewed: {
        en: "Reviewed",
        fi: "Arvosteltu",
        sv: "Recenserad",
      },
      loading: {
        en: "Loading...",
        fi: "Ladataan...",
        sv: "Laddar...",
      },
      error: {
        en: "Failed to load data.",
        fi: "Tietojen lataaminen epäonnistui.",
        sv: "Det gick inte att ladda data.",
      },
      businessNotFound: {
        en: "Business not found.",
        fi: "Yritystä ei löytynyt.",
        sv: "Företaget hittades inte.",
      },
      back: {
        en: "← Back",
        fi: "← Takaisin",
        sv: "← Tillbaka",
      },
      alreadyReviewed: {
        en: "You have already reviewed this restaurant.",
        fi: "Olet jo arvostellut tämän ravintolan.",
        sv: "Du har redan recenserat denna restaurang.",
      },
      addImage: {
        en: "Add Image",
        fi: "Lisää kuva",
        sv: "Lägg till bild",
      },
    };
    return texts[key][language];
  };


  if (loading)
    return (
      <div className="loading-container">
        <InfinitySpin width="200" color="#4fa94d" />
        <p className="text-gray-600 dark:text-gray-300">{getText("loading")}</p>
      </div>
    );
  if (error) return <p className="text-red-500">{getText("error")}</p>;
  if (!businessData)
    return (
      <p className="text-gray-600 dark:text-gray-300">
        {getText("businessNotFound")}
      </p>
    );

  return (
    <section className="business-details container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <LoginPromptModal isOpen={isLoginPromptOpen} onClose={handleModalClose} />
      <button
        className="btn btn-back text-blue-500 hover:underline"
        onClick={() => navigate(-1)}
      >
        {getText("back")}
      </button>

      <BusinessHeader
        name={capitalizeFirstLetter(businessData.name)}
        rating={businessData.reviewsAverage}
        totalReviews={businessData.reviewsTotal}
      />

<div className="button-group">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={(event) => {
            if (!token) {
              event.preventDefault();
              setIsLoginPromptOpen(true);
            } else if (!hasUserReviewed) {
              openReviewModal();
            } else {
              alert(getText("alreadyReviewed"));
            }
          }}
          disabled={hasUserReviewed}
        >
          {hasUserReviewed ? getText("reviewed") : getText("writeReview")}
        </button>

        <label
          className="btn btn-upload bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:mt-0"
          onClick={(event) => {
            if (!token) {
              event.preventDefault();
              setIsLoginPromptOpen(true);
            }
          }}
        >
          {getText("addImage")}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddToFavorites}
          disabled={loading}
        >
          {addingToFavorites ? getText("loading") : getText("addToFavorites")}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="business-info">
        <Images images={businessData.images} />

        {
          uploading &&
          <div className="loading-container-photo">
            <InfinitySpin width="200" color="#4fa94d" />
            <p>Uploading image...</p>
          </div>
        }

        <Address
          address={{
            street: capitalizeFirstLetter(businessData.address),
            city: capitalizeFirstLetter(businessData.city),
            postal: businessData.postal_code,
          }}
          coordinates={{
            lat: businessData.latitude,
            long: businessData.longitude,
          }}
          phone={businessData.phone}
          website={businessData.website}
        />
      </div >

      <ReviewsSection reviews={reviews} />

      {
        isReviewModalOpen && (
          <WriteReviewModal
            closeModal={closeReviewModal}
            addReview={addReview}
            cafeId={id}
          />
        )
      }
    </section >
  );
}

export default Business;
