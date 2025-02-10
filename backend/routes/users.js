const express = require("express")
const router = express.Router()
const userController = require("../controller/users")
// const { Passport } = require("passport")
const passport = require("passport")
const { isAuthenticated } = require("../passportConfig")

router
    .post("/createuser", userController.createUser)  
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
                // res.cookie('token', user.id) // for storing cookie
                return res.status(200).json({ name: user.name, id: user.id });
            });
        })(req, res, next)})
    .get("/logout", userController.logout )
    .post("/highscores", userController.highscores)
    .post("/checkuser", userController.checkUser)

    
exports.route = router


