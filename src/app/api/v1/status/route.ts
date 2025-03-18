import database from '@/infra/database';

import { NextResponse } from 'next/server';

// GET request handler
export async function GET() {

  const updatedAt = new Date().toISOString()

  // Query the database for ther version
  const dbVersion = (await database.query("SHOW server_version")).rows[0] as { server_version: string };

  // Query the database for the max connections
  const dbMaxConnection = (await database.query("SHOW max_connections")).rows[0] as { max_connections: string };

  // Query the database for the used connections
  const usedConnections = (await database.query("SELECT COUNT(*)::int FROM pg_stat_activity WHERE state='active';")).rows[0] as { count: number };

  const body = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion.server_version,
        max_connections:  parseInt(dbMaxConnection.max_connections),
        opened_connections: usedConnections.count
      }
    }

  }

  return NextResponse.json(body, {
    status: 200
  });
}
