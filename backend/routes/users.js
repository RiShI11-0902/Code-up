const express = require("express")
const router = express.Router()
const userController = require("../controller/users")
// const { Passport } = require("passport")
const passport = require("passport")

router
    .post("/createuser", userController.createUser)
    .post("/loginuser", passport.authenticate("local") ,  userController.loginUser)

exports.route = router