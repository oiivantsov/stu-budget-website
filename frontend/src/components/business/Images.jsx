function Images({ images }) {
    return (
      <div className="business-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Business Image ${index + 1}`} />
        ))}
      </div>
    );
  }
  
  export default Images;
  