import { NextResponse } from 'next/server';
import migrationsRunner, { RunnerOption } from 'node-pg-migrate';
import { join } from 'path';
import database from '@/infra/database';
import { Client } from 'pg';

const getMigrationsDefaultOption = async (): Promise<RunnerOption & { dbClient: Client }> => {
  const dbClient = await database.getNewClient()

  return {
    dbClient: dbClient,
    dir: join("src","infra", "migrations"),
    dryRun: true,
    migrationsTable: 'local',
    verbose: true,
    direction: 'up'
  }

}

export async function GET() {
  const migrationOption = await getMigrationsDefaultOption()
  const pendingMigrations = await migrationsRunner({
    ...migrationOption
  })
  migrationOption.dbClient?.end()
  return NextResponse.json(pendingMigrations, {
    status: 200
  });
}

export async function POST() {
  const migrationOption = await getMigrationsDefaultOption()
  const migrations = await migrationsRunner({
    ...migrationOption,
    dryRun: false
  })
  migrationOption.dbClient?.end()

  if (migrations.length <= 0) {
    return NextResponse.json(migrations, {
      status: 201
    });

  }
  return NextResponse.json(migrations, {
    status: 200
  });
}
