const API_BASE_URL = "http://127.0.0.1:3000/restaurant";

export const fetchAllCafes = async () => {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) throw new Error("Failed to fetch cafes");
    return response.json();
};

export const fetchCafeById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/id?id=${id}`);
    if (!response.ok) throw new Error("Failed to fetch cafe");
    return response.json();
};

export const fetchCafesByCity = async (city) => {
    const response = await fetch(`${API_BASE_URL}/city?city=${city}`);
    if (!response.ok) throw new Error("Failed to fetch cafes by city");
    return response.json();
};

export const fetchNearbyCafes = async (city, street, limit) => {
    const response = await fetch(`${API_BASE_URL}/nearby`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, street, limit }),
    });
    if (!response.ok) throw new Error("Failed to fetch nearby cafes");
    return response.json();
};

export const addReview = async (review) => {
    const response = await fetch(`${API_BASE_URL}/review/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error("Failed to add review");
    return response.json();
};

export const updateReview = async (review) => {
    const response = await fetch(`${API_BASE_URL}/review/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error("Failed to update review");
    return response.json();
};

export const deleteReview = async (id) => {
    const response = await fetch(`${API_BASE_URL}/review/delete?id=${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete review");
    return response.json();
};

export const uploadImage = async (formData, userId, restaurantId) => {
    const response = await fetch(
        `${API_BASE_URL}/image/upload?user=${userId}&restaurant=${restaurantId}`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        console.error("Response failed:", await response.text());
        throw new Error("Failed to upload image");
    }
    return response.json();
};
