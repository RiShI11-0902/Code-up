const model = require("../models/users");
const User = model.User;

exports.createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const exits = await User.findOne({ username: username });

    if (exits) {
      req.flash("error", "Email Already Exits!!");
      return res.status(401).json({ flashMessages: req.flash('error') }); // Send flash messages in response
    } else {
      const user = new User();

      user.name = name;
      user.username = username;
      user.password = password;
      await user.save();
      req.login(user, (err) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json({ id: user._id, name: user.name });
        }
      });
    }
    // req.login( user, (err)=>{
    //     if(err) return res.json({error: err})
    //     res.status(201).json({id: user._id, name: user.name});
    // })
   
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = (req, res) => {
  const user = req.user;

  // if (!user) {
  //   console.log(req.flash("error")[0]);
  //   const err =  req.flash("error")[0];
  //   return res.status(401).json({ message: err});
  // }else{
  // }
  return res.status(200).json({ name: user.name, id: user.id });

  // console.log(req.body.name);
};

exports.logout = (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.send(200);
  });
};

exports.findUser = async (req, res) => {
  // console.log(req.body);

  try {
    const user = await User.find();

    user.sort((a, b) => {
      const aHighestScore = getHighScore(a.score_history, req.body.lang);
      const bHighScore = getHighScore(b.score_history, req.body.lang);
      return bHighScore - aHighestScore;
    });

    // console.log(user);
    res.json({ user: user });
  } catch (error) {
    console.log(error);
  }

  function getHighScore(scoreHistory, lang) {
    let highScore = 0;
    scoreHistory.map((val) => {
      if (val.topic == lang) {
        console.log(val.topic);
        const score = parseInt(val.score);
        if (score > highScore) {
          highScore = score;
        }
      }
    });
    // scoreHistory.forEach((val) => {
    //   if (val.topic == lang) {
    //     // const score = parseInt(val.score);
    //     // if (score > highScore) {
    //     //   highScore = score;
    //     // }
    //     console.log(val.topic);
    //   }
    // });
    return highScore;
  }

  // const sendUsers = []
  // // console.log();

  // user.map((user)=>{
  //   user.score_history.map((topic)=>{
  //     if (topic.topic == lang) {
  //       // console.log(topic.score);
  //       sendUsers.push(user)
  //     }
  //   })
  // })

  // user.score_history.map((topic)=>{
  //   console.log(topic.score);
  // })
};
