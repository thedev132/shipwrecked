import { NextResponse } from 'next/server';
import { getRecords } from '@/lib/airtable';

export async function GET() {
  try {
    const records = await getRecords("RSVPs", {
      filterByFormula: "",
      sort: [],
      maxRecords: 1,
      count: true
    });

    return NextResponse.json({ count: records.length });
  } catch (error) {
    console.error('Error fetching Airtable stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
} 