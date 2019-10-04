const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack:teste@aircnc-i6px9.mongodb.net/aircnc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// req.query = Acessar Query Params (para filtros)
// req.params = Acessar Route Params (para edição, delete)
// req.body = Acessar Corpo da Requisição (para criação, edição)

app.use(express.json());
app.use(routes);

app.listen(3030);
