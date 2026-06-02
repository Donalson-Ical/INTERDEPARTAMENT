async function getPlayers(teamId: string) {
  const res = await fetch(`http://localhost:3000/api/players?teamId=${teamId}`, {
    cache: 'no-store'
  })
  return res.json()
}

const EQUIPOS = [
  { id: '86', nombre: 'Real Madrid' },
  { id: '81', nombre: 'FC Barcelona' },
  { id: '65', nombre: 'Manchester City' },
  { id: '64', nombre: 'Liverpool' },
  { id: '5', nombre: 'Bayern Munich' },
  { id: '524', nombre: 'PSG' },
  { id: '109', nombre: 'Juventus' },
  { id: '57', nombre: 'Arsenal' },
]

interface Player {
  id: number
  name: string
  teamId: number
  team: string
  position: string
  age: number
} 

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ teamId?: string }>
}) {
  const { teamId = '86' } = await searchParams
  const equipo = EQUIPOS.find(e => e.id === teamId) || EQUIPOS[0]
  const data = await getPlayers(teamId)
  const players: Player[] = data.players || []

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <a href="/" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6 inline-block">
        ← Volver al Menú
        </a>

        <h1 className="text-3xl font-bold mb-6">Jugadores</h1>

        {/* Selector de equipos */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {EQUIPOS.map(e => (
            <a
              key={e.id}
              href={"/players?teamId=" + e.id}
              className={"px-4 py-2 rounded-lg text-sm font-semibold " + (teamId === e.id ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}
            >
              {e.nombre}
            </a>
          ))}
        </div>

        {/* Header equipo */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-300">{equipo.nombre}</h2>
          <p className="text-gray-400 text-sm">{players.length} jugadores</p>
        </div>

        {/* Tabla */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nombre</th>
                <th className="p-4 text-left">Equipo</th>
                <th className="p-4 text-center">Posición</th>
                <th className="p-4 text-center">Edad</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="p-4 text-gray-400 text-sm">{player.id}</td>
                  <td className="p-4 font-semibold">{player.name}</td>
                  <td className="p-4 text-gray-300">{player.team}</td>
                  <td className="p-4 text-center">
                    <span className={"px-2 py-1 rounded text-xs font-semibold " + (
                      player.position === 'Goalkeeper' ? 'bg-yellow-600 text-yellow-100' :
                      player.position === 'Defence' ? 'bg-blue-600 text-blue-100' :
                      player.position === 'Midfield' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    )}>
                      {player.position === 'Goalkeeper' ? 'Portero' :
                       player.position === 'Defence' ? 'Defensa' :
                       player.position === 'Midfield' ? 'Mediocampista' :
                       player.position === 'Offence' ? 'Delantero' : player.position}
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-300">{player.age} años</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}