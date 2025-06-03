import { NextResponse } from 'next/server';
import type { PortfolioData } from '@/types';

export async function POST(request: Request) {
  try {
    const data: PortfolioData = await request.json();

    // In a real application, you would save this data to a database
    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      username: data.username,
      message: "Profile created successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create profile" },
      { status: 400 }
    );
  }
} 