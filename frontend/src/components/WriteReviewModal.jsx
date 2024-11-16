import React, { useState } from 'react';
import './Modal.css';

function WriteReviewModal({ closeModal, addReview }) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && rating && comment) {
            addReview({ name, rating: `${rating} ★`, comment });
            closeModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>×</button>
                <h2>Write a Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default WriteReviewModal;
