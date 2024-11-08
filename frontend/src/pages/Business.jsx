import BusinessHeader from '../components/business/BusinessHeader';
import Images from '../components/business/Images';
import Address from '../components/business/Address';
import ReviewsSection from '../components/business/ReviewsSection';
import businessData from '../data/businessData';
import { Link } from 'react-router-dom';

function Business() {
    return (
        <section className="business-details">
            <BusinessHeader
                name={businessData.name}
                rating={businessData.rating}
                totalReviews={businessData.totalReviews}
                category={businessData.category}
            />
            
            <div className="button-group">
                <button className="btn btn-review">Write a Review</button>
                <button className="btn btn-favorite">Add to Favorites</button>
                <button className="btn btn-share">Share</button>
            </div>

            <div className="business-info">
                <Images images={businessData.images} />
                <Address address={businessData.address} />
            </div>

            <ReviewsSection reviews={businessData.reviews} />
        </section>
    );
}

export default Business;
