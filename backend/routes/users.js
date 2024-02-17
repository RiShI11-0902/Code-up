const express = require("express")
const router = express.Router()
const userController = require("../controller/users")

router
    .post("/createuser", userController.createUser)

exports.route = router