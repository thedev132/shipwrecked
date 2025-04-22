import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    console.log('Count endpoint called');
    const filePath = path.join(process.cwd(), 'app/api/stats/count.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log('Count endpoint returning:', data.count);
    return NextResponse.json({ count: data.count });
  } catch (error) {
    console.error('Error fetching cached stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
} 