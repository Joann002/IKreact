import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(tasks)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        dueDate: new Date(body.dueDate),
        project: body.project ?? null,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 400 })
  }
}


