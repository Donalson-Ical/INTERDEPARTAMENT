import mysql from 'mysql2/promise';

export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'futbol_db'
        });

        const [rows] = await connection.execute('SELECT COUNT(*) as total FROM equipos');
        await connection.end();

        return new Response(JSON.stringify({
            mensaje: 'Conexión exitosa a base de datos',
            totalEquipos: rows[0].total
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}