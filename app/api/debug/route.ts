import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const checks: Record<string, string> = {
    DATABASE_URL: process.env.DATABASE_URL ? '✅ set' : '❌ MISSING',
    AUTH_SECRET: process.env.AUTH_SECRET ? '✅ set' : '❌ MISSING',
    AUTH_URL: process.env.AUTH_URL ? '✅ set' : '❌ MISSING',
    GITHUB_ID: process.env.GITHUB_ID ? '✅ set' : '❌ MISSING',
    GITHUB_SECRET: process.env.GITHUB_SECRET ? '✅ set' : '❌ MISSING',
  }

  let dbStatus = '❌ FAILED'
  let dbError = ''
  try {
    await prisma.$queryRaw`SELECT 1`
    dbStatus = '✅ CONNECTED'
  } catch (e) {
    dbError = String(e)
  }

  return NextResponse.json({ envVars: checks, database: dbStatus, dbError })
}
