async function getStats(competition: string) {
  const res = await fetch(`http://localhost:3000/api/stats?competition=${competition}`, {
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

interface Stat {
  id: number
  jugador: string
  equipo: string
  goles: number
  asistencias: number
  partidos: number
  penales: number
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ competition?: string }>
}) {
  const { competition = 'PD' } = await searchParams
  const liga = LIGAS.find(l => l.code === competition) || LIGAS[0]
  const data = await getStats(competition)
  const stats: Stat[] = data.stats || []

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <a href="/" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">
          ← Volver al Menú
        </a>

        <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>

        {/* Selector ligas */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {LIGAS.map(l => (
            <a
              key={l.code}
              href={"/stats?competition=" + l.code}
              className={"px-4 py-2 rounded-lg text-sm font-semibold " + (competition === l.code ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}
            >
              {l.nombre}
            </a>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-300">{liga.nombre}</h2>
          <p className="text-gray-400 text-sm">{stats.length} jugadores</p>
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
              {stats.map((stat, index) => (
                <tr key={stat.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="p-4 text-gray-400 font-bold">{index + 1}</td>
                  <td className="p-4 font-semibold">{stat.jugador}</td>
                  <td className="p-4 text-gray-300">{stat.equipo}</td>
                  <td className="p-4 text-center text-gray-300">{stat.partidos}</td>
                  <td className="p-4 text-center font-bold text-yellow-400 text-lg">{stat.goles}</td>
                  <td className="p-4 text-center text-green-400">{stat.asistencias}</td>
                  <td className="p-4 text-center text-gray-300">{stat.penales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}