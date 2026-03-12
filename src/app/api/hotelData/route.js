import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hotel_id = searchParams.get('hotel_id');
  const type = searchParams.get('type'); // details, photos, reviews, facilities, policies, description, rooms
  
  // Specific for availability
  const arrival_date = searchParams.get('arrival_date');
  const departure_date = searchParams.get('departure_date');
  const adults = searchParams.get('adults') || '1';
  const room_qty = searchParams.get('room_qty') || '1';

  if (!hotel_id || !type) {
    return NextResponse.json({ error: 'hotel_id and type are required' }, { status: 400 });
  }

  const endpointMap = {
    details: 'getHotelDetails',
    photos: 'getHotelPhotos',
    reviews: 'getHotelReviews',
    facilities: 'getHotelFacilities',
    policies: 'getHotelPolicies',
    description: 'getDescriptionAndInfo',
    rooms: 'getRoomList',
    availability: 'getAvailability'
  };

  const endpoint = endpointMap[type];
  if (!endpoint) {
    return NextResponse.json({ error: 'Invalid data type requested' }, { status: 400 });
  }

  const options = {
    method: 'GET',
    url: `https://booking-com15.p.rapidapi.com/api/v1/hotels/${endpoint}`,
    params: {
      hotel_id: hotel_id,
      languagecode: 'en-us'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST
    }
  };

  // Add specific params for availability
  if (type === 'availability') {
    options.params.arrival_date = arrival_date;
    options.params.departure_date = departure_date;
    options.params.adults = adults;
    options.params.room_qty = room_qty;
  }

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Error fetching hotel ${type}:`, error.response?.data || error.message);
    return NextResponse.json(
      { error: `Failed to fetch ${type}`, details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
