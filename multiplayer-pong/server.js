const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const sockets = require("./sockets");

const httpServer = http.createServer(apiServer);
const socketServer = io(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

sockets.listen(socketServer);
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
