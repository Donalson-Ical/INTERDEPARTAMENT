import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

// Permitir peticiones desde tu frontend
app.use(cors());

// 🔑 Tu API KEY (pon la tuya aquí)
const API_KEY = "567fcab0bd289ba5b12df51f9947313594a313cf63819c6d73e4f9113dc6551e";

// 📌 Ruta: obtener equipos
app.get("/equipos/:id", async (req, res) => {
  try {
    const teamId = req.params.id;

    const url = `https://allsportsapi.com/api/football/?&met=Teams&teamId=${teamId}&APIkey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener equipos" });
  }
});

// 📌 Ruta: obtener jugadores
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

// 📌 Ruta: buscar equipos
app.get("/equipos/:id", async (req, res) => {
  try {
    const teamId = req.params.id;

    const url = `https://allsportsapi.com/api/football/?&met=Teams&teamId=${teamId}&APIkey=${API_KEY}`;

    console.log("URL:", url); // 👈 AQUÍ

    const response = await fetch(url);

    console.log("STATUS:", response.status); // 👈 AQUÍ

    const data = await response.json();

    console.log("DATA:", data); // 👈 AQUÍ (MUY IMPORTANTE)

    res.json(data);

  } catch (error) {
    console.log("ERROR REAL:", error); // 👈 AQUÍ
    res.status(500).json({ error: "Error al obtener equipos" });
  }
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

