import pg, { ConnectionConfig } from "pg";
import dotenv from "dotenv";
import { PoolConfig } from "pg";
import { Connection } from "pg";
import { ConnectOpts } from "net";
dotenv.config();

const { Pool }: any = pg;
export const connection: any = new Pool({
    connectionString: process.env.DATABASE_URL,
});