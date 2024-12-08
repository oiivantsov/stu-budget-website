const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RESTAURANT_URL = `${API_BASE_URL}/restaurant`;

const getToken = () => localStorage.getItem("token");

export const fetchAllCafes = async () => {
    const response = await fetch(`${RESTAURANT_URL}/all`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch cafes");
    return response.json();
};

export const fetchCafeById = async (id) => {
    const response = await fetch(`${RESTAURANT_URL}/id?id=${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch cafe");
    return response.json();
};

export const fetchCafesByCity = async (city) => {
    const response = await fetch(`${RESTAURANT_URL}/city?city=${city}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch cafes by city");
    return response.json();
};

export const fetchNearbyCafes = async (city, street, limit) => {
    const response = await fetch(`${RESTAURANT_URL}/nearby`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ city, street, limit }),
    });
    if (!response.ok) throw new Error("Failed to fetch nearby cafes");
    return response.json();
};

export const addReview = async (review) => {
    const response = await fetch(`${RESTAURANT_URL}/review/add`, {
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

export const updateReview = async (review) => {
    const response = await fetch(`${RESTAURANT_URL}/review/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error("Failed to update review");
    return response.json();
};

export const deleteReview = async (id) => {
    const response = await fetch(`${RESTAURANT_URL}/review/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) throw new Error("Failed to delete review");
    return response.json();
};

export const uploadImage = async (formData, userId, restaurantId) => {
    const response = await fetch(
        `${RESTAURANT_URL}/image/upload?user=${userId}&restaurant=${restaurantId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getToken()}`, // Include token
            },
            body: formData,
        }
    );

    if (!response.ok) {
        console.error("Response failed:", await response.text());
        throw new Error("Failed to upload image");
    }
    return response.json();
};
