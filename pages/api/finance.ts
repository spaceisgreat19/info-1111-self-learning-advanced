import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apartment, issue } = await req.json();

    return NextResponse.json({
      message: `Finance request for apartment ${apartment} regarding: ${issue} has been logged.`,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}