async function getMatches(competition: string, status: string) {
  const res = await fetch(`http://localhost:3000/api/matches?competition=${competition}&status=${status}`, {
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

interface Match {
  id: number
  localId: number
  local: string
  visitanteId: number
  visitante: string
  fecha: string
  estado: string
  jornada: number
  golesLocal: number | string
  golesVisitante: number | string
}

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ competition?: string; status?: string }>
}) {
  const { competition = 'PD', status = 'FINISHED' } = await searchParams
  const liga = LIGAS.find(l => l.code === competition) || LIGAS[0]
  const data = await getMatches(competition, status)
  const matches: Match[] = data.matches || []

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <a href="/" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">
          ← Volver al Menú
        </a>

        <h1 className="text-3xl font-bold mb-6">Partidos</h1>

        {/* Selector ligas */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {LIGAS.map(l => (
            <a
              key={l.code}
              href={"/matches?competition=" + l.code + "&status=" + status}
              className={"px-4 py-2 rounded-lg text-sm font-semibold " + (competition === l.code ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}
            >
              {l.nombre}
            </a>
          ))}
        </div>

        {/* Selector estado */}
        <div className="flex gap-3 mb-8">
          {[['FINISHED', 'Finalizados'], ['SCHEDULED', 'Próximos']].map(([val, label]) => (
            <a
              key={val}
              href={"/matches?competition=" + competition + "&status=" + val}
              className={"px-4 py-2 rounded-lg text-sm font-semibold " + (status === val ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-300">{liga.nombre}</h2>
          <p className="text-gray-400 text-sm">{matches.length} partidos</p>
        </div>

        {/* Tabla */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4 text-center">Jornada</th>
                <th className="p-4 text-right">Local</th>
                <th className="p-4 text-center">Resultado</th>
                <th className="p-4 text-left">Visitante</th>
                <th className="p-4 text-center">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr key={match.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="p-4 text-center text-gray-400 text-sm">{match.jornada}</td>
                  <td className="p-4 text-right font-semibold">{match.local}</td>
                  <td className="p-4 text-center">
                    <span className="bg-gray-700 px-3 py-1 rounded font-bold text-yellow-400">
                      {match.golesLocal} - {match.golesVisitante}
                    </span>
                  </td>
                  <td className="p-4 text-left font-semibold">{match.visitante}</td>
                  <td className="p-4 text-center text-gray-400 text-sm">
                    {new Date(match.fecha).toLocaleDateString('es-GT')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}