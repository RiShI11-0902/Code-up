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
    // const question = await Question.find({ topic: findRoom.lang });
    const question = await Question.aggregate([
      { $match: { topic: findRoom.lang } }, // Match documents with the specified topic
      { $sample: { size: 10 } }, // Retrieve 10 random documents
    ]);

    console.log("second" + question);

    console.log(findRoom.player1.name);
    console.log(data.room);
    // const pl1 = findRoom.player1.pop

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

      // const question = await Question.find({ topic: data.lang }).limit(10);
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

    // const player2 = await User.findById(data.userId)
    // io.emit("quiz_started")
    // ioto.emit("questions", question)
    // socket.to(data.room).emit("questions", question)
    // io.to(data.room).emit("questions", question);
    // // io.broadcast.to(data.room).emit("questions", question)
    // console.log("done");
  });



  socket.on("endGame", async (data)=>{
    
    const room = await Room.findById(data.roomId)

    socket.join(data.roomId)
    room.completed += 1
    room.save()
    
    if (room.completed == 2) {
      io.to(data.roomId).emit("gameOver")
    }
  })

  socket.on("closeGame", async (data)=>{
    console.log(data);
    const p1 = await User.findById(data.p1)
    const p2 = await User.findById(data.p2)
    const findLang = await Room.findById(data.roomId)
    console.log(findLang.lang);

    if (data.p1 == findLang.player1) {
      p1.score_history.push({topic: findLang.lang, score: data.player1})
    }else{
      p2.score_history.push({topic: findLang.lang, score: data.player2})
    }


    p1.save()
    p2.save()

    const room = await Room.deleteOne({id: data.id})
    // console.log(p1);
    // console.log(p2);
    console.log("deleted");
  })
  

  socket.on("check_ans", async (data) => {
    console.log(data);
    socket.join(data.roomId);
    // const question = await Question.findById(data.q_id);
    const room = await Room.findById(data.roomId);
    // console.log(room.player1._id);
    // console.log(room.player2._id);

    if (data.userId == room.player1._id) {
      console.log("ans by  player 1");
      room.score_p1 += 1;
      room.save();
      io.to(room.id).emit("correct_ans", {
        userId: room.player1._id,
        p1: room.score_p1,
        p2: room.score_p2,
      });
    } else {
      console.log("ans by  player 1");
      room.score_p2 += 1;
      room.save();
      io.to(room.id).emit("correct_ans", {
        userId: room.player2._id,
        p1: room.score_p1,
        p2: room.score_p2,
      });
    }

    // if (question.correctOptionIndex == data.ind) {
    //   if (data.userId == room.player1._id) {
    //     console.log("ans by  player 1"  );
    //     room.score_p1 += 1
    //     room.save()
    //     io.to(room.id).emit("correct_ans", { p1: room.score_p1, p2: room.score_p2 })
    //   }else{
    //     room.score_p2 += 1;
    //     room.save()
    //     io.to(room.id).emit("correct_ans", { p1: room.score_p1, p2: room.score_p2 })
    //   }
    // }else{
    //   console.log("Wrong ans");
    //   io.to(room.id).emit("correct_ans", { p1: room.score_p1, p2: room.score_p2 })
    // }

    // console.log(room);

    // id = data.id
    // const question = await Question.findById(data.id);
    // const p1 = await Room.findById(data.roomId).populate("player1");
    // const p2 = await Room.findById(data.roomId).populate("player2");

    // const p2 = await Room.findById(data.roomId).populate("player2");

    // const user1 = await User.findById(data.userId);

    // console.log(user1);
    //

    // io.to(data.roomId).emit("correct_ans", { user1, p2: p2.player2 });

    // if (data.userId == p1.player1._id) {
    //   console.log("player 1 answered");
    //   p1.player1.current_score = 1 ;
    //   await p1.save();
    //   console.log(p1.player1.current_score);
    //   socket.emit("correct_ans", { score: p1.player1.current_score, user: p1.player1._id });
    // } else {
    //   console.log("player 2 answerred");
    //   p2.player2.current_score += 1;
    //   await p2.save();
    //   console.log(p2.player1.current_score);
    //   socket.emit("correct_ans", { score: p2.player2.current_score, user: p2.player2._id });
    // }

    // const p1 = room.player1;
    // const p2 = room.player2._id;
    // console.log(p1);

    // if (question.correctOptionIndex == data.ind && data.userId == p1) {
    //   room.score_p1 += 1
    //   socket.emit("correct_ans", { correct: true, userId: p2, score: room.score_p1 });
    // } else if (question.correctOptionIndex == data.ind && data.userId == p2) {
    //   room.score_p2 += 1
    //   socket.emit("correct_ans", { correct: true, userId: p2, score: room.score_p2 });
    // } else {
    //   socket.emit("correct_ans", { correct: false });
    // }
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
