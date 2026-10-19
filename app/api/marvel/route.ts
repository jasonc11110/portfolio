import { NextResponse } from "next/server"

const APP_KEY = process.env.MARVEL_KV_APP_KEY ?? "h9bv06hi"
const STATE_KEY = "marvel-checklist-v1"
const UPSTREAM = "https://keyvalue.immanuel.co/api/KeyVal"

export const dynamic = "force-dynamic"

const noStore = { "Cache-Control": "no-store" }

export async function GET() {
  try {
    const res = await fetch(`${UPSTREAM}/GetValue/${APP_KEY}/${STATE_KEY}`, {
      cache: "no-store",
    })
    if (!res.ok) {
      return NextResponse.json({ error: "unavailable" }, { status: 502, headers: noStore })
    }
    return new NextResponse(await res.text(), {
      status: 200,
      headers: { "Content-Type": "application/json", ...noStore },
    })
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502, headers: noStore })
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.text()).trim()
    if (!/^[A-Za-z0-9_-]{1,1024}$/.test(payload)) {
      return NextResponse.json({ error: "invalid" }, { status: 400, headers: noStore })
    }
    const res = await fetch(`${UPSTREAM}/UpdateValue/${APP_KEY}/${STATE_KEY}/${payload}`, {
      method: "POST",
      cache: "no-store",
    })
    if (!res.ok) {
      return NextResponse.json({ error: "unavailable" }, { status: 502, headers: noStore })
    }
    return new NextResponse(await res.text(), {
      status: 200,
      headers: { "Content-Type": "application/json", ...noStore },
    })
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502, headers: noStore })
  }
}
