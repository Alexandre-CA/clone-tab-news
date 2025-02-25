import { NextResponse } from 'next/server';
import migrationsRunner from 'node-pg-migrate';
import { join } from 'path';
// GET request handler
export async function GET() {

  const migrations = await migrationsRunner({
    databaseUrl: process.env.DATABASE_URL!,
    dir: join("infra", "migrations"),
    dryRun: true,
    migrationsTable: 'local',
    verbose: true,
    direction: 'up'
  })
  console.log(migrations);

  return NextResponse.json(migrations, {
    status: 200
  });
}

export async function POST() {

  const migrations = await migrationsRunner({
    databaseUrl: process.env.DATABASE_URL!,
    dir: join("infra", "migrations"),
    dryRun: false,
    migrationsTable: 'local',
    verbose: true,
    direction: 'up'
  })
  console.log(migrations);

  return NextResponse.json(migrations, {
    status: 200
  });
}
