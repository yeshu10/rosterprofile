import { NextResponse } from 'next/server';
import type {  PortfolioParseResponse } from '@/types';

import { mockData as initialMockData } from "../../../../data/mockPortfolio"; 

// Create a mutable copy of the mock data
const mockData = initialMockData;

export { mockData }; // Export the mutable mockData


export async function GET(): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    const response: PortfolioParseResponse = {
      success: true,
      data: mockData
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return NextResponse.json({ success: false, message: "An internal error occurred during fetching." });
  }
}

export async function POST(): Promise<NextResponse<PortfolioParseResponse>> {
  try {
    
    // await request.json(); // Request parameter is not used


    const response: PortfolioParseResponse = {
      success: true,
      data: mockData 
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error processing POST portfolio:", err);
    return NextResponse.json({ success: false, message: "An internal error occurred during parsing." });
  }
}

