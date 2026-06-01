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
            mensaje: 'Conexión exitosa',
            totalEquipos: rows[0].total
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        // Devuelve el error completo para verlo en el navegador
        return new Response(JSON.stringify({
            error: error.message,
            stack: error.stack,
            code: error.code
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}