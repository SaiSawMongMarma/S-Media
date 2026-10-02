import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

try {
  new URL(connectionString);
} catch {
  throw new Error("DATABASE_URL must be a valid PostgreSQL connection string");
}

const databaseUrl = new URL(connectionString);

// Neon connection strings copied from some dashboards may omit the database
// name or contain the dashboard's HTTP port. Prisma needs the PostgreSQL
// database and port when it runs server-side queries.
if (databaseUrl.pathname === "/" || databaseUrl.pathname === "") {
  databaseUrl.pathname = "/neondb";
}
if (databaseUrl.port === "3000") {
  databaseUrl.port = "5432";
}

const adapter = new PrismaNeonHttp(databaseUrl.toString(), {});
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
