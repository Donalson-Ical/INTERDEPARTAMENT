import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition') || 'PD'
  const limit = searchParams.get('limit') || '10'

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${competition}/scorers?limit=${limit}`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    }
  )
  const data = await res.json()
  return NextResponse.json(data)
}