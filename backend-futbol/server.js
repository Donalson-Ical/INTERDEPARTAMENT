import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import mysql from 'mysql2/promise';

const app = express();
const PORT = 3000;

app.use(cors());

const API_KEY = "567fcab0bd289ba5b12df51f9947313594a313cf63819c6d73e4f9113dc6551e";

let db;
async function conectarDB() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'futbol_db'
        });
        console.log('✅ Conectado a MySQL');
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
}

app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) as total FROM equipos');
        res.json({ 
            mensaje: '✅ Tu BD funciona Herbert', 
            totalEquipos: rows[0].total 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/equipos/:id", async (req, res) => {
    try {
        const teamId = req.params.id;
        const [rows] = await db.execute('SELECT * FROM equipos WHERE id = ?', [teamId]);
        if (rows.length > 0) {
            return res.json({ success: true, data: rows[0], source: 'MySQL' });
        }
        const url = `https://allsportsapi.com/api/football/?&met=Teams&teamId=${teamId}&APIkey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.result && data.result.length > 0) {
            const equipo = data.result[0];
            await db.execute(
                'INSERT INTO equipos (id, nombre, ciudad, estadio) VALUES (?, ?, ?, ?)',
                [teamId, equipo.team_name, equipo.team_city || 'Desconocida', equipo.stadium_name || 'No registrado']
            );
            console.log(`✅ Equipo guardado: ${equipo.team_name}`);
        }
        res.json({ success: true, data: data.result, source: 'API' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/jugadores/:teamId", async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const url = `https://allsportsapi.com/api/football/?&met=Players&teamId=${teamId}&APIkey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener jugadores" });
    }
});

async function iniciar() {
    await conectarDB();
    app.listen(PORT, () => {
        console.log(`Servidor en http://localhost:${PORT}`);
        console.log(`Prueba: http://localhost:${PORT}/test-db`);
    });
}

iniciar();