import { NextRequest, NextResponse } from 'next/server';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Simple in-memory contact message storage (replace with database in production)
const contactMessages: ContactMessage[] = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields required' },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);

    // In a real application, you would send an email here
    console.log('New contact message:', newMessage);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
