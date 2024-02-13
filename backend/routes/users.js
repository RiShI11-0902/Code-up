const express = require("express")
const router = express.Router()
const userController = require("../controller/users")

router.get("/", userController.createUser)

exports.route = router