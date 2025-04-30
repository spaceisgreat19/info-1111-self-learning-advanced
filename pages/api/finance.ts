import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apartment, issue } = await req.json();

    // Handle missing parameters
    if (!apartment || !issue) {
      return NextResponse.json({ message: 'Missing apartment or issue' }, { status: 400 });
    }

    // Log the request (for debugging purposes)
    console.log(`Received finance request for apartment ${apartment} regarding: ${issue}`);

    return NextResponse.json({
      message: `Finance request for apartment ${apartment} regarding: ${issue} has been logged.`,
    });
  } catch (error) {
    // Log error for debugging purposes
    console.error('Error processing finance request:', error);
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }
}

export function OPTIONS(req: NextRequest) {
  // Set CORS headers (if needed)
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');  // Allow all origins
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allow certain methods
  headers.set('Access-Control-Allow-Headers', 'Content-Type');  // Allow Content-Type header

  return NextResponse.json({}, { status: 200, headers });
}