import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const item = await prisma.goal.findUnique({ where: { id: params.id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const body = await req.json()
    if (body.targetDate) body.targetDate = new Date(body.targetDate)
    const updated = await prisma.goal.update({ where: { id: params.id }, data: body })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await prisma.goal.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 })
  }
}


