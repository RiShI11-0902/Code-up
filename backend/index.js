// Always required
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const parser = require("body-parser");
//for connection to db
const connection = require("./databsaseConfig");

const { initializePaasport } = require("./passportConfig");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");

const { Question } = require("./models/questions");
const { Room } = require("./models/room");

// const { startSocket, initSocket } = require("./controller/question")
//calling passport and db
initializePaasport(passport);
connection();

//middleware
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// const findQuestions = async (lang)=>{

//     console.log(question);
//     return question
// }

io.on("connection", (socket) => {
  console.log("user" + socket.id);

  socket.on("joinRoom", async (data) => {
    const findRoom = await Room.findById(data.room).populate("player1");
    const findUser = await User.findById(data.userId);
    const question = await Question.find({ topic: findRoom.lang });

    console.log(findRoom.player1.name);
    console.log(data.room);
    // const pl1 = findRoom.player1.pop

    if (findRoom && findUser) {
      findRoom.player2 = data.userId;
      socket.join(findRoom.id);
      io.to(data.room).emit("roomDetails", {
        p2: findUser.name,
        room: findRoom,
        p1: findRoom.player1.name,
        question,
      });
      console.log("ojijh");
    }

    console.log("joined" + data);
  });

  // const joinRoom = (socket,data)=>{
  //   socket.join(data)
  // }

  socket.on("start", async (data) => {
    // joinRoom(socket, data.room)

    console.log(data);

    const newRoom = new Room();
    if (data.method == "friend") {
      newRoom.private = true;
      newRoom.vacant = false;
      newRoom.player1 = data.userId;
      newRoom.player2 = data.userId;
      newRoom.lang = data.lang;

      await newRoom.save();

      const question = await Question.find({ topic: data.lang });
      const player1 = await User.findById(data.userId);
      console.log(player1);
      socket.join(newRoom.id);
      io.to(newRoom.id).emit("roomDetails", {
        room: newRoom,
        question,
        p1: player1.name,
        p2: "",
      });
    }

    socket.on("check_answer", (data)=>{

    })

    // const player2 = await User.findById(data.userId)
    // io.emit("quiz_started")
    // ioto.emit("questions", question)
    // socket.to(data.room).emit("questions", question)
    // io.to(data.room).emit("questions", question);
    // // io.broadcast.to(data.room).emit("questions", question)
    // console.log("done");
  });
});

//sesssion creation

app.use(
  session({
    secret: "mkldfj",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//individual routes
const userRoutes = require("./routes/users");
app.use("/user", userRoutes.route);

const help = require("./routes/helper");
app.use("/", help.route);

const questions = require("./routes/questions");
const { on } = require("events");
const { User } = require("./models/users");

app.use("/", questions.route);

server.listen(8000);







