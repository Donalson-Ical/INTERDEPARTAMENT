import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition') || 'PD'

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${competition}/teams`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    }
  )

  const data = await res.json()

  const teams = data.teams?.map((team: any) => ({
    id: team.id,
    nombre: team.name,
    nombreCorto: team.shortName,
    ciudad: team.address,
    estadio: team.venue,
    fundado: team.founded,
    escudo: team.crest,
    web: team.website
  })) || []

  return NextResponse.json({
    competition,
    total: teams.length,
    teams
  })
}

//http://localhost:3000/api/teams?competition=PD
//equipos participantes en la temporada actual de la liga española (PD)