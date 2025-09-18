import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(projects)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        progress: body.progress ?? 0,
        status: body.status,
        dueDate: new Date(body.dueDate),
        priority: body.priority,
        team: JSON.stringify(body.team ?? []),
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 400 })
  }
}


