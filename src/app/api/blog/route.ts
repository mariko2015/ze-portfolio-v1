import { NextResponse } from 'next/server'
import { getBlogData } from '../../../../services/blog'

export async function GET() {
  try {
    return NextResponse.json({ status: true, data: await getBlogData() }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return NextResponse.json({ status: false, error: 'Articles are temporarily unavailable.' }, { status: 503 })
  }
}
