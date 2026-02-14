import { NextRequest, NextResponse } from 'next/server';

interface FeedbackItem {
  id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

// Simple in-memory feedback storage (replace with database in production)
const feedbackStore: FeedbackItem[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Homeowner',
    feedback: 'Excellent service! Very professional and thorough.',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Office Manager',
    feedback: 'Best cleaning company in the area!',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(feedbackStore);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, role, feedback, rating } = await request.json();

    if (!name || !feedback || !rating) {
      return NextResponse.json(
        { message: 'Required fields missing' },
        { status: 400 }
      );
    }

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      name,
      role: role || 'Customer',
      feedback,
      rating,
      createdAt: new Date().toISOString(),
    };

    feedbackStore.unshift(newFeedback);

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
