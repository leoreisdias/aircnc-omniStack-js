const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://omnistack:teste@aircnc-i6px9.mongodb.net/aircnc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on("connection", socket => {
  console.log(socket.handshake.query);
  console.log("Usuário conectado", socket.id);

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});
// req.query = Acessar Query Params (para filtros)
// req.params = Acessar Route Params (para edição, delete)
// req.body = Acessar Corpo da Requisição (para criação, edição)

app.use(express.json());
app.use(cors());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(routes);

server.listen(3030);
