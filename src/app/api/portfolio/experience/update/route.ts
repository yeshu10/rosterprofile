import { NextResponse } from 'next/server';
import type { Experience, PortfolioParseResponse } from '@/types';
import { mockData } from '@/data/mockPortfolio';

// In a real application, this would be stored in a database
// let mockData = {
//   experience: [] as Experience[]
// };

export async function PUT(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    const updatedExperience: Experience = await request.json();

    // Validate required fields
    if (!updatedExperience.id || !updatedExperience.company || !updatedExperience.position || !updatedExperience.type) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Find and update the experience in the mock data
    const index = mockData.experience.findIndex(exp => exp.id === updatedExperience.id);
    if (index === -1) {
      return NextResponse.json({
        success: false,
        message: 'Experience not found'
      });
    }

    mockData.experience[index] = updatedExperience;

    return NextResponse.json({
      success: true,
      data: mockData
    });
  } catch (err) {
    console.error('Error updating experience:', err);
    return NextResponse.json({
      success: false,
      message: 'Failed to update experience'
    });
  }
} 