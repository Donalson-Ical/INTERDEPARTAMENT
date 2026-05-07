import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition') || 'PD'
  const limit = searchParams.get('limit') || '20'

  const scorersRes = await fetch(
    `https://api.football-data.org/v4/competitions/${competition}/scorers?limit=${limit}`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    }
  )

  const scorersData = await scorersRes.json()

  const stats = scorersData.scorers?.map((item: any) => ({
    id: item.player.id,
    jugador: item.player.name,
    equipo: item.team.name,
    equipoId: item.team.id,
    goles: item.goals ?? 0,
    asistencias: item.assists ?? 0,
    partidos: item.playedMatches ?? 0,
    penales: item.penalties ?? 0
  })) || []

  return NextResponse.json({
    competition,
    season: scorersData.season,
    total: stats.length,
    stats
  })
}

//http://localhost:3000/api/stats?competition=PD&limit=20