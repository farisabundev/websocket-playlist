var express = require("express");
var socket = require("socket.io");

// app setup
var app = express();
var port = 5000;
var server = app.listen(port, () => {
  console.log(`listening to request on port ${port}`);
});

// static files
app.use(express.static("public"));

// socket setup
var io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  // handle chat event
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
