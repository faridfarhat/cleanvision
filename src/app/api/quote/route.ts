import { NextRequest, NextResponse } from 'next/server';

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  createdAt: string;
}

// Simple in-memory quote request storage (replace with database in production)
const quoteRequests: QuoteRequest[] = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, date } = await request.json();

    if (!name || !email || !phone || !service || !date) {
      return NextResponse.json(
        { message: 'All fields required' },
        { status: 400 }
      );
    }

    const newQuote: QuoteRequest = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      service,
      date,
      createdAt: new Date().toISOString(),
    };

    quoteRequests.push(newQuote);

    // In a real application, you would send an email here
    console.log('New quote request:', newQuote);

    return NextResponse.json(newQuote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
