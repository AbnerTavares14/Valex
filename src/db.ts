import pg, { ConnectionConfig } from "pg";
import dotenv from "dotenv";
import { PoolConfig } from "pg";
import { Connection } from "pg";
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});