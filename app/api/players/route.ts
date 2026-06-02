import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teamId = searchParams.get('teamId') || '86'

  const res = await fetch(
    `https://api.football-data.org/v4/teams/${teamId}`,
    {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    }
  )

  const data = await res.json()

  const players = data.squad?.map((player: any) => {
    const birth = player.dateOfBirth ? new Date(player.dateOfBirth) : null
    const age = birth
      ? Math.floor((new Date().getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
      : null

    return {
      id: player.id,
      teamId: data.id,
      team: data.name,
      name: player.name,
      position: player.position,
      age
    }
  }) || []

  return NextResponse.json({
    teamId: data.id,
    team: data.name,
    total: players.length,
    players
  })
}

//http://localhost:3000/api/players?teamId=86
//jugadores del equipo con ID 86 (Real Madrid) en la temporada actual de la liga española (PD)