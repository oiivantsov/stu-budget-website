import { useState } from "react";

export default function useLogin(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Changed to false by default

    const login = async (object) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object),
            });
            const user = await response.json();

            if (!response.ok) {
                setError(user.error);
                return null; // Return null on error
            }

            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(user));

            setIsLoading(false);
            return user; // Return user data on success
        } catch (err) {
            setError("An error occurred while logging in."); // Handle unexpected errors
            setIsLoading(false);
            return null; // Return null on exception
        }
    };

    return { login, isLoading, error };
}