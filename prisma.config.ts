import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

const databaseUrl = new URL(env('DATABASE_URL'))
if (databaseUrl.pathname === '/' || databaseUrl.pathname === '') {
  databaseUrl.pathname = '/neondb'
}
if (databaseUrl.port === '3000') {
  databaseUrl.port = '5432'
}

export default defineConfig({
  schema: 'prisma/schema.prisma',

  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl.toString(),
  },
})
