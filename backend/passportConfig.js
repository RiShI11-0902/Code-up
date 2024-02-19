const localStrategy = require("passport-local");
const { User } = require("./models/users");


exports.initializePaasport = (passport) => {
  passport.use(
    new localStrategy(async (username, password, next) => { // always take username and password only as the parameters nothing ele like email
      try {
        const findUser = await User.findOne({ username });
        if (!findUser) return next(null, false);
        if (password != findUser.password) return next(null, false);
        next(null, findUser);
      } catch (error) {
        next(error, false);
      }
    })
  );
  passport.serializeUser((user, next) => {
    next(null, user.id);
    console.log("id is " + user.id);
  });
  passport.deserializeUser(async (id, next) => {
    try {
      const user = await User.findById(id);
      return next(null, user);
    } catch (error) {
      return next(error, false);
    }
  });
};

exports.isAuthenticated = (req,res,next)=>{
  if (req.user) {
    return next()
  }
  res.send(401)
}
