import { NextResponse } from 'next/server';
import type { Experience, PortfolioParseResponse } from '@/types';
// Import and use the shared mockData from parse/route.ts
import { mockData } from '@/app/api/portfolio/parse/route';

// In a real application, this would be stored in a database
// let mockData = {
//   experience: [] as Experience[]
// };

export async function PUT(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    const updatedExperience: Experience = await request.json();

    // Validate the experience data
    if (!updatedExperience.id || !updatedExperience.company || !updatedExperience.position) {
      return NextResponse.json({
        success: false,
        message: "Invalid experience data. Required fields: id, company, position"
      });
    }

    // Find and update the experience in the shared mock data
    const index = mockData.experience.findIndex(exp => exp.id === updatedExperience.id);
    if (index === -1) {
      return NextResponse.json({
        success: false,
        message: "Experience not found"
      });
    }

    // Update the experience in the shared mock data
    mockData.experience[index] = updatedExperience;

    // Return the entire updated portfolio data
    const response: PortfolioParseResponse = {
      success: true,
      data: { // Return the full PortfolioData structure
        ...mockData
      }
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error updating experience:", err);
    return NextResponse.json({
      success: false,
      message: "An internal error occurred while updating experience."
    });
  }
} 