import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition') || 'PD'

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${competition}/standings`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    }
  )
  const data = await res.json()
  return NextResponse.json(data)
}

//http://localhost:3000/api/standings?competition=PD
//tabla de posiciones de la temporada actual de la liga española (PD)