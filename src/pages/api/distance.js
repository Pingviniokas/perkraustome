// src/pages/api/distance.js
import axios from 'axios';

export default async function handler(req, res) {
  const { fromAddress, toAddress } = req.body;

  if (!fromAddress || !toAddress) {
    return res.status(400).json({ error: 'Both addresses are required' });
  }

  const geocodeUrlFrom = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fromAddress)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const geocodeUrlTo = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(toAddress)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const fromResponse = await axios.get(geocodeUrlFrom);
    const toResponse = await axios.get(geocodeUrlTo);

    const fromLocation = fromResponse.data.results[0].geometry.location;
    const toLocation = toResponse.data.results[0].geometry.location;

    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${fromLocation.lat},${fromLocation.lng}&destinations=${toLocation.lat},${toLocation.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    
    const distanceResponse = await axios.get(distanceUrl);
    const distanceText = distanceResponse.data.rows[0].elements[0].distance.text;

    // Check if the destination is in Vilnius
    const isInVilnius = toResponse.data.results[0].address_components.some(component => 
      component.long_name.toLowerCase() === 'vilnius' && 
      (component.types.includes('locality') || component.types.includes('administrative_area_level_2'))
    );

    res.status(200).json({ distance: distanceText, isInVilnius });
  } catch (error) {
    console.error('Error fetching distance:', error);
    res.status(500).json({ error: 'Error calculating distance' });
  }
}
