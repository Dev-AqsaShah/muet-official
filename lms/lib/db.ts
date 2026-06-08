import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const DB_URL = 'postgresql://postgres.xbpmgvthzcpsbmnahxmk:MUETaqsa2026@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require&connect_timeout=60&pool_timeout=30&connection_limit=5'

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
    datasources: { db: { url: DB_URL } },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
