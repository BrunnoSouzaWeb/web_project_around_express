import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const cardsRouter = express.Router();

// Obtem o nome completo do arquivo atual e o diretório correspondente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo JSON
const filepath = path.join(__dirname, "../data/cards.json");
// Rota da lista dos cartões
cardsRouter.get("/cards", (req, res) => {
  // Lê o arquivo JSON
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.error("Falha na leitura do arquivo cards.json", err);
      return res
        .status(500)
        .json({ error: "Falha no acesso aos dados dos cartoes." });
    }
    const cards = JSON.parse(data || "{}");
    if (typeof cards !== "object") {
      console.error("Falha em parsear o JSON dos cartões.");
      return res
        .status(500)
        .json({ error: "Falha em processar os dados dos cartoes." });
    }
    return res.json(cards); // Retorna a lista dos cartões
  });
});

export default cardsRouter;
