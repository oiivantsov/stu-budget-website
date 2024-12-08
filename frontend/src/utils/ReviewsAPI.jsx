const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REVIEW_URL = `${API_BASE_URL}/review`;

const getToken = () => localStorage.getItem("token");

export const fetchReviewById = async (reviewId) => {
    const response = await fetch(`${REVIEW_URL}?reviewId=${reviewId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch review by ID");
    return response.json();
};

export const fetchReviewsForRestaurant = async (restaurantId) => {
    const response = await fetch(`${REVIEW_URL}/restaurant?restaurantId=${restaurantId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch reviews for restaurant");
    return response.json();
};

export const fetchReviewsForUser = async (userId) => {
    const response = await fetch(`${REVIEW_URL}/user?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch reviews for user");
    return response.json();
};

export const addReview = async (review) => {
    const response = await fetch(REVIEW_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error("Failed to add review");
    return response.json();
};

export const updateReview = async (reviewId, updatedFields) => {
    const response = await fetch(`${REVIEW_URL}?reviewId=${reviewId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error("Failed to update review");
    return response.json();
};

export const deleteReview = async (reviewId) => {
    const response = await fetch(`${REVIEW_URL}?reviewId=${reviewId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to delete review");
    return response.status === 204; // Success, no content
};
