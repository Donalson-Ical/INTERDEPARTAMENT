import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition') || 'PD'

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${competition}/matches?status=SCHEDULED`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    }
  )

  const data = await res.json()

  const matches = data.matches?.map((match: any) => ({
    id: match.id,
    localId: match.homeTeam.id,
    local: match.homeTeam.name,
    visitanteId: match.awayTeam.id,
    visitante: match.awayTeam.name,
    fecha: match.utcDate,
    jornada: match.matchday,
    estado: match.status
  })) || []

  return NextResponse.json({
    competition,
    total: matches.length,
    matches
  })
}

//http://localhost:3000/api/nextmatch?competition=PD
//próximo partido de la liga española (PD)