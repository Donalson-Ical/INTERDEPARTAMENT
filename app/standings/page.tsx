async function getStandings(competition: string) {
  const res = await fetch(`http://localhost:3000/api/standings?competition=${competition}`, {
    cache: 'no-store'
  })
  return res.json()
}

const LIGAS = [
  { code: 'PD', nombre: 'La Liga', logo: 'https://crests.football-data.org/laliga.png' },
  { code: 'PL', nombre: 'Premier League', logo: 'https://crests.football-data.org/PL.png' },
  { code: 'BL1', nombre: 'Bundesliga', logo: 'https://crests.football-data.org/BL1.png' },
  { code: 'SA', nombre: 'Serie A', logo: 'https://crests.football-data.org/SA.png' },
  { code: 'FL1', nombre: 'Ligue 1', logo: 'https://crests.football-data.org/FL1.png' },
]

interface TeamRow {
  position: number
  team: { name: string; shortName: string; crest: string }
  playedGames: number
  won: number
  draw: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ competition?: string }>
}) {
  const { competition = 'PD' } = await searchParams
  const liga = LIGAS.find(l => l.code === competition) || LIGAS[0]
  const data = await getStandings(competition)
  const table: TeamRow[] = data.standings?.[0]?.table || []

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <a href="/" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">
         ← Volver al Menú
        </a>

        <div className="flex gap-3 mb-8 flex-wrap">
          {LIGAS.map(l => (
            <a
              key={l.code}
              href={"/standings?competition=" + l.code}
              className={"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold " + (competition === l.code ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}
            >
              {l.nombre}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{liga.nombre}</h1>
            <p className="text-gray-400">Temporada 2025/26 - Jornada {data.season?.currentMatchday}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Equipo</th>
                <th className="p-4 text-center">PJ</th>
                <th className="p-4 text-center">G</th>
                <th className="p-4 text-center">E</th>
                <th className="p-4 text-center">P</th>
                <th className="p-4 text-center">GF</th>
                <th className="p-4 text-center">GC</th>
                <th className="p-4 text-center">DG</th>
                <th className="p-4 text-center font-bold text-white">Pts</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr
                  key={row.position}
                  className={"border-t border-gray-700 transition-colors " + (index < 4 ? "border-l-4 border-l-blue-500" : index < 6 ? "border-l-4 border-l-orange-500" : index >= table.length - 3 ? "border-l-4 border-l-red-500" : "")}
                >
                  <td className="p-4 text-gray-400 font-bold">{row.position}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{row.team.shortName || row.team.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-300">{row.playedGames}</td>
                  <td className="p-4 text-center text-green-400">{row.won}</td>
                  <td className="p-4 text-center text-gray-300">{row.draw}</td>
                  <td className="p-4 text-center text-red-400">{row.lost}</td>
                  <td className="p-4 text-center text-gray-300">{row.goalsFor}</td>
                  <td className="p-4 text-center text-gray-300">{row.goalsAgainst}</td>
                  <td className="p-4 text-center text-gray-300">{row.goalDifference}</td>
                  <td className="p-4 text-center font-bold text-yellow-400 text-lg">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-6 mt-4 text-sm text-gray-400">
          <span>Azul: Champions League</span>
          <span>Naranja: Europa League</span>
          <span>Rojo: Descenso</span>
        </div>

      </div>
    </main>
  )
}