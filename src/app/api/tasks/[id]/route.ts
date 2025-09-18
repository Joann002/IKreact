import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const task = await prisma.task.findUnique({ where: { id: params.id } })
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(task)
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const data = await req.json()
    const updated = await prisma.task.update({ where: { id: params.id }, data })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await prisma.task.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 })
  }
}


