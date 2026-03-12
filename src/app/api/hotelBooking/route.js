import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const checkinDate = searchParams.get('checkinDate'); // YYYY-MM-DD
  const checkoutDate = searchParams.get('checkoutDate'); // YYYY-MM-DD
  const adults = searchParams.get('adults') || '1';
  const rooms = searchParams.get('rooms') || '1';

  if (!destination) {
    return NextResponse.json({ error: 'Destination is required' }, { status: 400 });
  }

  try {
    // Phase 1: Search for destination ID
    const searchDestOptions = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
      params: { query: destination },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': process.env.RAPID_API_HOST
      }
    };

    const destResponse = await axios.request(searchDestOptions);
    const destinations = destResponse.data.data;

    if (!destinations || destinations.length === 0) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    const dest_id = destinations[0].dest_id;
    const search_type = destinations[0].search_type;

    // Phase 2: Search for hotels
    const searchHotelOptions = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        dest_id: dest_id,
        search_type: search_type,
        arrival_date: checkinDate,
        departure_date: checkoutDate,
        adults: adults,
        room_qty: rooms,
        page_number: '1',
        units: 'metric',
        temperature_unit: 'c',
        languagecode: 'en-us',
        currency_code: 'USD'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': process.env.RAPID_API_HOST
      }
    };

    const hotelResponse = await axios.request(searchHotelOptions);
    return NextResponse.json(hotelResponse.data);

  } catch (error) {
    console.error('Hotel Search API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch hotels', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}