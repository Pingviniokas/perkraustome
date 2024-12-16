import axios from 'axios';

/**
 * Fetch Google Reviews using the Google Places API.
 * @returns {Array} List of 5-star reviews or an empty array on error.
 */
export async function getGoogleReviews() {
  const PLACE_ID = 'ChIJwXuTVfmT3UYRQYH4KN8EauM'; // Replace with your actual Place ID
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&reviews_no_translations=true&language=lt&key=${API_KEY}`;

  try {
    const response = await axios.get(API_URL);
    const reviews = response.data.result?.reviews || [];
    return reviews.filter((review) => review.rating === 5);
  } catch (error) {
    console.error('Error fetching Google Reviews:', error.message);
    return [];
  }
}
