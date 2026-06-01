export default function Home() {
  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center">INTERDEPARTAMENT ⚽ Mi Web de Fútbol</h1>
      <p className="text-center text-gray-400 mt-4">Selecciona un endpoint para ver datos</p>

      <div className="mt-8 grid grid-cols-1 gap-4 max-w-xl mx-auto">
        <a href="/api/standings" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-center">
          📊 Tabla de Posiciones
        </a>
        <a href="/api/matches" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-center">
          📅 Partidos
        </a>
        <a href="/goleadores.html" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-center">
          ⚽ Goleadores
        </a>
        <a href="/api/teams" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-center">
          🏟️ Equipos
        </a>
        <a href="/api/players?teamId=86" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-center">
          👤 Jugadores
        </a>
        <a href="/api/stats" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 text-center">
          📈 Estadísticas
        </a>
      </div>
    </main>
  )
}