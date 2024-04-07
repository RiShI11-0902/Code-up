const express = require("express")
const router = express.Router()
const userController = require("../controller/users")
// const { Passport } = require("passport")
const passport = require("passport")

router
    .post("/createuser", userController.createUser)
    // .post("/loginuser", passport.authenticate("local", {failureFlash:true}, (req,res,next)=>{
    //     console.log(req.body);

    // } ) ,  userController.loginUser)  
    .post("/loginuser", (req, res, next) => {
        passport.authenticate('local', { failureFlash: true }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('error', info.message)
                // console.log();
                return res.status(401).json({ flashMessages: req.flash('error') }); // Send flash messages in response
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                // Authentication successful, handle accordingly (e.g., redirect)
                // res.status(200).json({ message: 'Login successful' }); // Send success message
                res.status(200).json({ name: user.name, id: user.id });
            });
        })(req, res, next)})
    .get("/logout", userController.logout )
    .post("/allUser", userController.findUser)
    
exports.route = router


