import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString,
    max: 10,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
  });

// Critical: without this, any dropped connection crashes the entire process
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema });