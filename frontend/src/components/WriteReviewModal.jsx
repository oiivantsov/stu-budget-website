import React, { useState } from 'react';
import { addReview as addReviewAPI } from '../utils/CafesAPI'; // Import the API function
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
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            // Construct the review object
            const newReview = {
                restaurant: cafeId, // Assuming cafeId maps to `restaurant` field
                rating: parseInt(rating, 10),
                comment,
                user: '674c6f2b3fb59690905a6d44', // Replace with dynamic user ID if available
            };

            // Call the API to add the review
            const response = await addReviewAPI(newReview);

            // Update parent component state
            addReview(response); // Pass the saved review back to the parent
            closeModal();
        } catch (err) {
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
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WriteReviewModal;
