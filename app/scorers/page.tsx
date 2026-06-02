async function getScorers(competition: string, limit: string) {
  const res = await fetch(`http://localhost:3000/api/scorers?competition=${competition}&limit=${limit}`, {
    cache: 'no-store'
  })
  return res.json()
}

const LIGAS = [
  { code: 'PD', nombre: 'La Liga' },
  { code: 'PL', nombre: 'Premier League' },
  { code: 'BL1', nombre: 'Bundesliga' },
  { code: 'SA', nombre: 'Serie A' },
  { code: 'FL1', nombre: 'Ligue 1' },
]

interface Scorer {
  player: { id: number; name: string; nationality: string }
  team: { name: string }
  goals: number
  assists: number
  playedMatches: number
  penalties: number
}

export default async function ScorersPage({
  searchParams,
}: {
  searchParams: Promise<{ competition?: string; limit?: string }>
}) {
  const { competition = 'PD', limit = '20' } = await searchParams
  const liga = LIGAS.find(l => l.code === competition) || LIGAS[0]
  const data = await getScorers(competition, limit)
  const scorers: Scorer[] = data.scorers || []

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <a href="/" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">
         ← Volver al Menú
        </a>

        <h1 className="text-3xl font-bold mb-6">⚽ Goleadores</h1>

        {/* Selector de ligas */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {LIGAS.map(l => (
            <a
              key={l.code}
              href={"/scorers?competition=" + l.code}
              className={"px-4 py-2 rounded-lg text-sm font-semibold " + (competition === l.code ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}
            >
              {l.nombre}
            </a>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-300">{liga.nombre}</h2>
          <p className="text-gray-400 text-sm">{scorers.length} jugadores</p>
        </div>

        {/* Tabla */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Jugador</th>
                <th className="p-4 text-left">Equipo</th>
                <th className="p-4 text-center">PJ</th>
                <th className="p-4 text-center">Goles</th>
                <th className="p-4 text-center">Asistencias</th>
                <th className="p-4 text-center">Penales</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((scorer, index) => (
                <tr key={scorer.player.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="p-4 font-bold text-gray-400">{index + 1}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{scorer.player.name}</p>
                      <p className="text-gray-400 text-xs">{scorer.player.nationality}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{scorer.team.name}</td>
                  <td className="p-4 text-center text-gray-300">{scorer.playedMatches}</td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-yellow-400 text-lg">{scorer.goals}</span>
                  </td>
                  <td className="p-4 text-center text-green-400">{scorer.assists ?? 0}</td>
                  <td className="p-4 text-center text-gray-300">{scorer.penalties ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}