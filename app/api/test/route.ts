export async function GET() {
  return Response.json({
    apiKey: process.env.FOOTBALL_API_KEY ? '✅ API Key cargada correctamente' : '❌ API Key no encontrada'
  })
}