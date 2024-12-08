import React, { useState } from 'react';
import { addReview as addReviewAPI } from '../utils/ReviewsAPI';
import './Modal.css';

function WriteReviewModal({ closeModal, addReview, cafeId }) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
    
        if (!rating || !comment) {
            setError('Please provide a rating and a comment.');
            setLoading(false);
            return;
        }
    
        try {
            // Construct the review object
            const newReview = {
                restaurant: cafeId,
                rating: parseInt(rating, 10),
                comment,
            };
    
            // Pass the new review to the parent component
            await addReview(newReview);
        } catch (err) {
            console.error('Failed to submit review:', err.message);
            setError('Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>
                    ×
                </button>
                <h2>Write a Review</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating (1-5):</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            min="1"
                            max="5"
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WriteReviewModal;
