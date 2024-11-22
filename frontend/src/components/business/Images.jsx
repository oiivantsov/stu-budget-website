import React from 'react';
import Slider from "react-slick"; // React Slick for carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Images({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="business-images-placeholder">
        <div className="placeholder-content">
          <p>No photos available yet!</p>
          <button className="upload-photo-btn">Upload Photos</button>
        </div>
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
        breakpoint: 768, // Adjust for smaller devices
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
            <img key={index} src={image} alt={`Business Image ${index + 1}`} className="carousel-image" />
          ))}
        </Slider>
      ) : (
        <div className="business-images">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Business Image ${index + 1}`} className="static-image" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Images;
