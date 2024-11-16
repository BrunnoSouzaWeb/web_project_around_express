import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const usersRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath = path.join(__dirname, "../data/users.json"); // Caminho para o arquivo JSON

// Rota da lista dos usuários
usersRouter.get("/users", (req, res) => {
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.error("Falha na leitura do arquivo users.json", err);
      return res
        .status(500)
        .json({ error: "Falha no acesso aos dados dos usuários." });
    }

    const users = JSON.parse(data || "{}");
    if (!Array.isArray(users)) {
      console.error("Falha em parsear o JSON dos usuários.");
      return res
        .status(500)
        .json({ error: "Falha em processar os dados dos usuários." });
    }

    return res.json(users); // Retorna a lista dos usuários
  });
});

// Rota para buscar um usuário pelo ID
usersRouter.get("/users/:id", (req, res) => {
  const userId = req.params.id; // Captura o ID da URL

  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.error("Falha leitura no users para usuário de pesquisa.", err);
      return res
        .status(500)
        .json({ error: "Falha no acesso aos dados do usuário de pesquisa." });
    }

    const users = JSON.parse(data || "{}");
    if (!Array.isArray(users)) {
      console.error("Falha em parsear o JSON do usuário de pesquisa.");
      return res
        .status(500)
        .json({ error: "Falha em processar os dados do usuário de pesquisa." });
    }

    const user = users.find((u) => u._id === userId); // Procura o usuário pelo ID

    if (user) {
      return res.json(user); // Retorna o usuário pesquisado
    }

    return res.status(404).json({ message: "ID do usuário não encontrado" }); // Erro 404 usuário não achado
  });
});

export default usersRouter;
