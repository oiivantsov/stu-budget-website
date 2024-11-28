# Backend API Requests for Application

## General Requests

### 1. Search Businesses by Name or City / Location
- **Endpoint:** `GET /restaurants`
- **Description:** Search for businesses by name or city using the search bar on the homepage.
- **Query Parameters:** 
  - `find`: Search keyword (e.g., name).
  - `near`: City or location.

### 2. Get Nearby Restaurants (Home page)
- **Endpoint:** `GET /restaurants/nearby`
- **Description:** Fetch a list of the three nearest restaurants based on the user's location, for the homepage.
- **Query Parameters:**
  - `latitude`: User's latitude.
  - `longitude`: User's longitude.
  - `limit`: Number of nearby restaurants to return (default: 3).

### 3. Get Recommended Businesses
- **Endpoint:** `GET /restaurants/recommended`
- **Description:** Fetch a list of recommended businesses, such as the top 3 based on average rating, for the homepage.

### 4. Get Filtered Restaurants
- **Endpoint:** `POST /restaurants/filter`
- **Description:** Filter restaurants based on attributes like the number of reviews and rating range for the search page.
- **Payload:**
  ```json
  {
    "averageScore": ["4.0 - 4.5", "4.6 - 5.0"],
    "reviewNumber": ["1-5", "6-10", "10+"]
  }
  ```
    ```json
  {
    "reviewNumber": ["1-5", "6-10"]
  }
  ```
    ```json
  {
    "averageScore": ["4.6 - 5.0"],
    "reviewNumber": ["10+"]
  }
  ```

## Detailed Requests

### 5. Get Business Details
- **Endpoint:** `GET /restaurants/{id}`
- **Description:** Retrieve detailed information about a specific business.
- **Parameters:**
  - `id`: Business ID.


---

## Reviews

### 6. Add Review
- **Endpoint:** `POST /restaurants/{id}/reviews`
- **Description:** Submit a new review for a specific business.
- **Parameters:**
  - `id`: Business ID.
- **Payload:** Reviewer, rating, and comments.
  ```json
    { 
        "id": 1, "name": "John D.", "rating": "5", "comment": "Amazing food and great atmosphere. Highly recommend the poke bowl!" 
    },
  ```

### 7. Get Reviews
- **Endpoint:** `GET /restaurants/{id}/reviews`
- **Description:** Fetch all reviews for a specific business (may be we dont need it because we have **Get Business Details**).
- **Parameters:**
  - `id`: Business ID.

---

## Favorites

### 8. Get Favorites
- **Endpoint:** `GET /favorites`
- **Description:** Retrieve the list of favorite restaurants for the logged-in user, for favorites page.

### 9. Add to Favorites
- **Endpoint:** `POST /favorites`
- **Description:** Add a specific business to the user's list of favorites.
- **Payload:** Business ID.

### 10. Remove from Favorites
- **Endpoint:** `DELETE /favorites/{id}`
- **Description:** Remove a business from the user's favorites.
- **Parameters:**
  - `id`: Business ID.

---

## User Authentication

### 11. Login
- **Endpoint:** `POST /login`
- **Description:** Authenticate the user and start a session.
- **Payload:** Username and password.

### 12. Sign Up
- **Endpoint:** `POST /signup`
- **Description:** Register a new user account.
- **Payload:** Username, password, and email.

### 13. Check Session
- **Endpoint:** `GET /session`
- **Description:** Verify the current user's session status.

---

## Images

### 14. Upload Business Images
- **Endpoint:** `POST /restaurants/{id}/images`
- **Description:** Upload images for a specific business.
- **Parameters:**
  - `id`: Business ID.
- **Payload:** Image files.

### 15. Get Business Images
- **Endpoint:** `GET /restaurants/{id}/images`
- **Description:** Retrieve all images associated with a business (may be we dont need it because we have **Get Business Details**).
- **Parameters:**
  - `id`: Business ID.