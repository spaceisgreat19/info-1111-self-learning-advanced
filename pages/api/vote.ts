import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { apartment, issue } = body;

    if (!apartment || !issue) {
      return NextResponse.json(
        { message: 'Missing apartment or issue details.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `Vote request for apartment ${apartment} regarding: ${issue} has been logged.`,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}