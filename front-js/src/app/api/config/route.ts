import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    commonKey: process.env.COMMON_KEY
  });
}
