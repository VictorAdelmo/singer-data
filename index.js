const express = require("express");
const rotas = require("./routes/rotas");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./resources/"));
app.use(bodyParser.urlencoded({ limit: "14mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "14mb" }))
app.use(cookieParser()); 

app.use(rotas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
