const express = require("express");
const rotas = require("./routes/rotas");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./resources/"));
app.use(express.json());
app.use(cookieParser()); 

app.use(rotas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
