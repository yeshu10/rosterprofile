import { NextResponse } from 'next/server';
import type { PortfolioData } from '@/types';
import { ProfileCreateResponse } from "@/types";

// Mock data - replace with actual profile creation logic
const mockProfileCreationResponse = {
  success: true,
  username: "testuser",
  message: "Profile created successfully!",
};

export async function POST(request: Request): Promise<NextResponse<ProfileCreateResponse>> {
  try {
    const profileData = await request.json();

 
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockProfileCreationResponse);

  } catch (err) {
    console.error("Error creating profile:", err);
    return NextResponse.json({ success: false, message: "An internal error occurred during profile creation." });
  }
} 