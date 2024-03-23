const { Question } = require("../models/questions");

exports.questionSend = async (req, res) => {
  // console.log(req.body.lang);
  // console.log(req.body.method);

  const question = await Question.find();
  // res.json({ question });
};

// exports.initSocket = (socket,data)=>{
//   console.log(data);
// //  socket.emit("start_quiz", ques)
// }
