import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(photos)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const photo = await prisma.photo.create({
            data: {
                url: body.url,
                title: body.title,
                width: body.width,
                height: body.height
            }
        })
        return NextResponse.json(photo)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save photo' }, { status: 500 })
    }
}
