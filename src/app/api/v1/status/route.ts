import database from '@infra/database';

import { NextResponse } from 'next/server';

// GET request handler
export async function GET() {
  const query = await database.query("SELECT 1 + 1 AS count")
  return NextResponse.json({
    query: query.rows
  }, {
    status: 200
  });
}
