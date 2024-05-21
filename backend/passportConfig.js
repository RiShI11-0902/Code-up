const localStrategy = require("passport-local");
const { User } = require("./models/users");
const bcrypt = require("bcrypt")

exports.initializePaasport = (passport) => {
  passport.use(
    new localStrategy(async (username, password, next) => { // always take username and password only as the parameters nothing else like email
      try {
        const findUser = await User.findOne({ username });
        if (!findUser) return next(null, false, {message: "Username Not Found!!!"}) ;
        if (!bcrypt.compareSync(password,findUser.password)) return next(null, false, {message: "Password Incorrect!!!"}) 
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
      console.log("okkkkkkkkkkkkkkkkkk");
      return next(null, user);
    } catch (error) {
      return next(error, false);
    }
  });
};

exports.isAuthenticated = (req,res,next)=>{
  if (req.user) {
   return next()
  }else{
    return res.send(401)
  }
}
























