import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.challenge.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await prisma.challenge.create({
      data: {
        title: body.title,
        description: body.description,
        type: body.type,
        status: body.status,
        progress: body.progress ?? 0,
        targetDate: body.targetDate ? new Date(body.targetDate) : null,
        completedDate: body.completedDate ? new Date(body.completedDate) : null,
        difficulty: body.difficulty,
        category: body.category,
        notes: body.notes ?? null,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create challenge' }, { status: 400 })
  }
}


