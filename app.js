import express from "express";
import usersRouter from "./routes/users.js";
import cardsRouter from "./routes/cards.js";

const port = 3000;
const app = express();

app.use(usersRouter);
app.use(cardsRouter);

// rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

// tratamento de erros
app.use((err, res) => {
  console.error("Erro no servidor:", err.stack); // Loga o erro no console
  res.status(500).json({ message: "Ocorreu um erro no servidor" });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
