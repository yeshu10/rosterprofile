import { NextResponse } from 'next/server';
import type { Experience, PortfolioParseResponse } from '@/types';
import { mockData } from '@/data/mockPortfolio';



export async function POST(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    const newExperience: Experience = await request.json();

    // Validate required fields
    if (!newExperience.company || !newExperience.position || !newExperience.type) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Add the new experience to the mock data
    mockData.experience.push(newExperience);

    return NextResponse.json({
      success: true,
      data: mockData
    });
  } catch (err) {
    console.error('Error adding experience:', err);
    return NextResponse.json({
      success: false,
      message: 'Failed to add experience'
    });
  }
} 