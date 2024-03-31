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
const end = 0;

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

io.on("connection", (socket) => {
  console.log("user" + socket.id);

  socket.on("joinRoom", async (data) => {

  

    const findRoom = await Room.findById(data.room).populate("player1");
    const findUser = await User.findById(data.userId);
    const question = await Question.aggregate([
      { $match: { topic: findRoom.lang } }, // Match documents with the specified topic
      { $sample: { size: 10 } }, // Retrieve 10 random documents
    ]);

    console.log("second" + question);

    console.log(findRoom.player1.name);
    console.log(data.room);

    if (findRoom && findUser) {
      findRoom.player2 = data.userId;
      await findRoom.save();
      socket.join(findRoom.id);
      io.to(data.room).emit("roomDetails", {
        p2: findUser,
        room: findRoom,
        p1: findRoom.player1,
        question,
      });
    }
  });

  socket.on("start", async (data) => {
    console.log(data);

    const newRoom = new Room();
    if (data.method == "friend") {
      newRoom.private = true;
      newRoom.vacant = false;
      newRoom.player1 = data.userId;
      newRoom.player2 = data.userId;
      newRoom.lang = data.lang;

      await newRoom.save();

      const question = await Question.aggregate([
        { $match: { topic: data.lang } }, // Match documents with the specified topic
        { $sample: { size: 10 } }, // Retrieve 10 random documents
      ]);

      console.log("first" + question);

      const player1 = await User.findById(data.userId);
      console.log(player1);
      socket.join(newRoom.id);
      io.to(newRoom.id).emit("roomDetails", {
        room: newRoom,
        question,
        p1: player1,
        p2: "",
      });
    }
  });

  socket.on("endGame", async (data) => {
    const room = await Room.findById(data.roomId);

    socket.join(data.roomId);
    room.completed += 1;
    room.save();

    if (room.completed == 2) {
      io.to(data.roomId).emit("gameOver");
    }
  });

  socket.on("closeGame", async (data) => {
    console.log(data);
    const findLang = await Room.findById(data.roomId);

    if (findLang.player1._id == data.user) {
      const p1 = await User.findById(findLang.player1._id);
      // console.log(p1.score_history);
      p1.score_history.forEach((val) => {

        if (val.topic != findLang.lang) {
          p1.score_history.push({ score: data.player_1, topic: findLang.lang });
        }

        if (val.topic == findLang.lang) {
          val.score = data.player_1;
        }
      });
      p1.save();
    } else {
      const p2 = await User.findById(findLang.player2._id);

      p2.score_history.forEach((val) => {

        if (val.topic != findLang.lang) {
          p2.score_history.push({ score: data.player_2, topic: findLang.lang });
        }

        if (val.topic == findLang.lang) {
          val.score = data.player_2;
        }
      });

      p2.save();
    }
   const delRoom =  await Room.findByIdAndDelete(data.roomId)
    console.log("deleted");
  });

  socket.on("check_ans", async (data) => {
    console.log(data);
    socket.join(data.roomId);
    const room = await Room.findById(data.roomId);

    if (data.userId == room.player1._id && data.correct == true) {
      console.log("ans by  player 1");
      room.score_p1 += 1;
      room.save();
      io.to(room.id).emit("correct_ans", {
        userId: room.player1._id,
        p1: room.score_p1,
        p2: room.score_p2,
      });
    } else if (data.userId == room.player2._id && data.correct == true) {
      console.log("ans by  player 1");
      room.score_p2 += 1;
      room.save();
      io.to(room.id).emit("correct_ans", {
        userId: room.player2._id,
        p1: room.score_p1,
        p2: room.score_p2,
      });
    } else {
      io.to(room.id).emit("correct_ans", {
        userId: room.player1._id,
        p1: room.score_p1,
        p2: room.score_p2,
      });
    }
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
