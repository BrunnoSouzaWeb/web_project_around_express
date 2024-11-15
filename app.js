const express = require("express");

const app = express();

// escute a porta 3000
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // se tudo estiver funcionando, o console vai mostrar que a porta do aplicativo está escutando
  console.log(`App listening at port ${PORT}`);
});
