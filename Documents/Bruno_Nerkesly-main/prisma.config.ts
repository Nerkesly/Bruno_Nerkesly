import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_6U1PWFTYLqXN@ep-old-heart-ayk7j5bf-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
