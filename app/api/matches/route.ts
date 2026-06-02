import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition') || 'PD'
  const status = searchParams.get('status') || 'FINISHED'

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${competition}/matches?status=${status}`,
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
    estado: match.status,
    jornada: match.matchday,
    golesLocal: match.score.fullTime.home ?? '-',
    golesVisitante: match.score.fullTime.away ?? '-'
  })) || []

  return NextResponse.json({
    competition,
    status,
    total: matches.length,
    matches
  })
}

//http://localhost:3000/api/matches?competition=PD&status=FINISHED
//partidos finalizados de la temporada actual de la liga española (PD)