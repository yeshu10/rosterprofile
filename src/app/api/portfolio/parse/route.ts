import { NextResponse } from 'next/server';
import type { PortfolioParseResponse } from '@/types';
import { mockData } from '@/data/mockPortfolio';

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

