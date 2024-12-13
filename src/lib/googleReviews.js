import axios from "axios";

/**
 * Fetch Google Reviews using the Google Places API.
 * @returns {Array} List of 5-star reviews.
 */
export async function getGoogleReviews() {
  const PLACE_ID = "ChIJwXuTVfmT3UYRQYH4KN8EauM"; // Replace with your actual Place ID
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use the API key from .env.local

  // Google Places API URL
  const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;

  try {
    // Fetch data from the API
    const response = await axios.get(API_URL);

    // Extract and filter reviews (only 5-star reviews)
    const reviews = response.data.result.reviews || [];
    return reviews.filter((review) => review.rating === 5);
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return [];
  }
}
