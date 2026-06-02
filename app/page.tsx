export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">

      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 py-12 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-4xl font-black tracking-wide uppercase">Mi Web Favorita de Fútbol</h1>
        <p className="text-gray-400 mt-2 text-sm">Información de fútbol en tiempo real</p>
      </div>

      {/* Grid de secciones */}
      <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <a href="/standings" className="group bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-xl p-6 transition-all hover:bg-gray-750">
          <div className="text-4xl mb-3">📊</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-blue-400">Tabla de Posiciones</h2>
          <p className="text-gray-400 text-sm mt-1">Clasificación de las mejores ligas</p>
        </a>

        <a href="/matches" className="group bg-gray-800 border border-gray-700 hover:border-green-500 rounded-xl p-6 transition-all hover:bg-gray-750">
          <div className="text-4xl mb-3">📅</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-green-400">Partidos</h2>
          <p className="text-gray-400 text-sm mt-1">Resultados y partidos jugados</p>
        </a>

        <a href="/scorers" className="group bg-gray-800 border border-gray-700 hover:border-yellow-500 rounded-xl p-6 transition-all hover:bg-gray-750">
          <div className="text-4xl mb-3">⚽</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-yellow-400">Goleadores</h2>
          <p className="text-gray-400 text-sm mt-1">Los máximos anotadores</p>
        </a>

        <a href="/teams" className="group bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl p-6 transition-all hover:bg-gray-750">
          <div className="text-4xl mb-3">🏟️</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-purple-400">Equipos</h2>
          <p className="text-gray-400 text-sm mt-1">Información de clubes y estadios</p>
        </a>

        <a href="/players" className="group bg-gray-800 border border-gray-700 hover:border-red-500 rounded-xl p-6 transition-all hover:bg-gray-750">
          <div className="text-4xl mb-3">🏃🏻‍♂️</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-red-400">Jugadores</h2>
          <p className="text-gray-400 text-sm mt-1">Plantillas y datos de jugadores</p>
        </a>

        <a href="/stats" className="group bg-gray-800 border border-gray-700 hover:border-orange-500 rounded-xl p-6 transition-all hover:bg-gray-750">
          <div className="text-4xl mb-3">📈</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-orange-400">Estadísticas</h2>
          <p className="text-gray-400 text-sm mt-1">Goles, asistencias y más</p>
        </a>

        <a href="/upcoming" className="group bg-gray-800 border border-gray-700 hover:border-cyan-500 rounded-xl p-6 transition-all hover:bg-gray-750 md:col-span-2 lg:col-span-3">
          <div className="text-4xl mb-3">🗓️</div>
          <h2 className="text-lg font-bold uppercase tracking-wide group-hover:text-cyan-400">Próximos Partidos</h2>
          <p className="text-gray-400 text-sm mt-1">Partidos programados por liga</p>
        </a>

      </div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-xs pb-8">
        Datos proporcionados por Football-Data.org  | Hecho con ❤️ por INTERDEPARTAMENT©
      </div>

    </main>
  )
}