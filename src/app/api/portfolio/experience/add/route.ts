import { NextResponse } from 'next/server';
import type { Experience, PortfolioParseResponse } from '@/types';
// Import and use the shared mockData from parse/route.ts
import { mockData } from '@/app/api/portfolio/parse/route';

// In a real application, this would be stored in a database
// let mockData = {
//   experience: [] as Experience[]
// };

export async function POST(request: Request): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    const newExperience: Experience = await request.json();

    // Validate the experience data
    if (!newExperience.company || !newExperience.position) { // ID is generated here now
      return NextResponse.json({
        success: false,
        message: "Invalid experience data. Required fields: company, position"
      });
    }

    // Generate a unique ID for the new experience (if not provided)
    if (!newExperience.id) {
      newExperience.id = `exp-${Date.now()}`;
    }

    // Add the new experience to the shared mock data
    mockData.experience.push(newExperience);

    // Return the entire updated portfolio data
    const response: PortfolioParseResponse = {
      success: true,
      data: { // Return the full PortfolioData structure
        ...mockData
      }
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error adding experience:", err);
    return NextResponse.json({
      success: false,
      message: "An internal error occurred while adding experience."
    });
  }
} 