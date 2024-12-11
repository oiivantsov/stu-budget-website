# Backend Self-Assessment

---

## Example 1: Refactoring Restaurant API Handlers

**How It Was:**
- Initial implementation of the restaurant API handlers had redundant logic and lacked proper validations for inputs and outputs.
- **Limitations:**
  - Error messages were inconsistent and lacked detailed information.
  - Hardcoded API responses without dynamic handling of edge cases.
  - Lack of modularity in utility functions like coordinate calculations.

```javascript
// Initial Implementation
export const getByCity = async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await dao.findByCity(city);
        if (restaurants.length > 0) return res.json(restaurants);
        else return res.status(404).json({msg:`No restaurants in ${city} found`})
    } catch (e) {
        return res.status(500).json({msg:"Server error"});
    }
}
```

**How It Is Now:**
- Modularized the coordinate calculations into a utility function `getDistanceBetweenCoords`.
- Standardized error handling using a `Tracer` utility.
- Improved validation for user inputs with detailed error messages.
- **Achievements:**
  - Enhanced readability and maintainability with modularized code.
  - Improved user experience by returning detailed and consistent error responses.

```javascript
// Refactored Implementation
export const getByCity = async (req, res) => {
    try {
        const { city } = req.query;
        Tracer.print(INFO, `Attempting to find restaurants in ${city}..`);
        const restaurants = await dao.findByCity(city);
        if (restaurants.length > 0) return res.json(restaurants);
        else return res.status(404).json({msg:`No restaurants in ${city} found`});
    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({msg:"Server error"});
    }
}
```

---

## Example 2: Enhancing User Schema with Address Field

**How It Was:**
- The user schema only supported basic fields like `username`, `password`, and `email`.
- **Limitations:**
  - Lack of support for additional user information like address.
  - No validation for new fields.

```javascript
// Initial Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
```

**How It Is Now:**
- Added a new `address` field to the schema to store user location information.
- Improved the `signup` static method to handle optional fields like `address`.
- **Achievements:**
  - Enhanced functionality with support for storing user address information.
  - Future-proofed the schema for potential feature expansions.

```javascript
// Enhanced Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        street: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        }
    }
});
```

---

## Example 3: Adding OpenAPI Documentation

**How It Was:**
- The backend lacked API documentation, making it difficult for frontend developers to integrate seamlessly.
- **Limitations:**
  - No clear definition of endpoints, request parameters, and responses.
  - Increased dependency on verbal communication between teams.

**How It Is Now:**
- Added comprehensive OpenAPI documentation for all major endpoints, including users, restaurants, and reviews.
- Utilized OpenAPI to describe request bodies, responses, and parameter validations.
- **Achievements:**
  - Simplified frontend-backend collaboration with well-documented APIs.
  - Improved onboarding for new developers with clear endpoint definitions.

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Restaurant API",
    "version": "1.0.0",
    "description": "Endpoints for managing users, restaurants, and reviews"
  },
  "paths": {
    "/user/register": {
      "post": {
        "summary": "Register a new user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User registered successfully"
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    }
  }
}
```

---

## Key Lessons Learned
1. **Modularization:** Breaking down logic into reusable utilities simplifies code maintenance and testing.
2. **Schema Enhancements:** Expanding schemas to include optional fields allows flexibility for future requirements.
3. **Documentation:** Adding OpenAPI specifications streamlines communication and collaboration between frontend and backend teams.
4. **Error Handling:** Consistent and detailed error messages enhance the developer and user experience.

