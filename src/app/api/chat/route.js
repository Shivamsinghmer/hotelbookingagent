import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const currentDate = new Date().toISOString().split('T')[0];
  const SYSTEM_PROMPT = `
You are a professional and friendly AI Hotel Booking Assistant for StayEase.
Your goal is to help users book a hotel by collecting 5 pieces of information:
1. Destination (City or Hotel name)
2. Check-in Date (YYYY-MM-DD or relative like "tomorrow")
3. Check-out Date (YYYY-MM-DD or relative)
4. Number of Guests
5. Number of Rooms

Guidelines:
- If any information is missing, ask for it politely one by one or in naturally grouped questions.
- Once you have ALL FIVE pieces of information, confirm them with the user and then output a FINAL JSON block at the end of your message.
- The JSON block MUST be formatted exactly like this: 
  FINAL_BOOKING_DATA: {"destination": "Paris", "checkin": "2024-05-10", "checkout": "2024-05-15", "guests": "2", "rooms": "1"}
- Keep the conversation helpful and concise.
- Reference the current date if relative dates are used. The current date is ${currentDate}.
`;

  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
