const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.15:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  // socket.on('createGame', ()=>{
  //     const roomID = makeID(4)
  //     socket.emit("newGame",roomID)
  //     console.log("roomID",roomID)
  // })

  // socket.on('joinGame', (data)=>{
  //     if(rooms[data.roomID]!==null){
  //       socket.join(data.roomID)
  //       console.log("player con",data.roomID)
  //     }
  // })

  // var roomID

  socket.on("createGame", () => {
    // roomie = roomID
    socket.emit("newGame", roomID);
    console.log("roomID", roomID);
  });

  socket.on("joinGame", (data) => {
    console.log("join", data);
    console.log("new room ", roomID);
    // roomie = roomID
    if (data === roomID) {
      socket.emit("play", "play");
      console.log("connected");
    } else {
      console.log("err");
      socket.emit("err");
    }
  });

  //

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("room", data);
  });

  // socket.on("send msg", (data) => {
  //   socket.broadcast.emit("view msg", data.msg);
  //   socket.to(data.room).emit("view msg",data.msg)
  //   console.log("data", data.msg);
  // });

  socket.on("send val", (data) => {
    console.log("sen val", data);
    socket.to(data.room).emit("recived val", data.value);
    console.log("data", data);
    console.log("data.room", data.room);
    console.log("data.value", data.value);

    // socket.broadcast.emit("recived val" , data)
  });

  socket.on("resetGame", () => {
    socket.emit("yesRestart");
  });
});

server.listen(3001, () => {
  console.log("server is running on port 3001... ");
});

const makeID = (len) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charLen = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLen));
  }
  return result;
};
let roomID = makeID(4);
