import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.goal.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await prisma.goal.create({
      data: {
        title: body.title,
        description: body.description,
        targetValue: body.targetValue,
        currentValue: body.currentValue ?? 0,
        unit: body.unit,
        targetDate: new Date(body.targetDate),
        status: body.status,
        category: body.category,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 400 })
  }
}


