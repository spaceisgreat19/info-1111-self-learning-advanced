import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apartment, issue } = await req.json();

    if (!apartment || !issue) {
      return NextResponse.json(
        { message: 'Missing apartment or issue details.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `Maintenance issue for apartment ${apartment} regarding: ${issue} has been logged.`,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}