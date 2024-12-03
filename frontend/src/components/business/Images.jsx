import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Images({ images }) {
  useEffect(() => {
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="business-images-placeholder">
        <p>No photos available yet!</p>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="business-images-carousel">
      {images.length > 3 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}/public/${image}`}
              alt={`Business Image ${index + 1}`}
              className="carousel-image"
            />
          ))}
        </Slider>
      ) : (
        <div className="business-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}/public/${image}`}
              alt={`Business Image ${index + 1}`}
              className="static-image"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Images;
