const express = require("express")
const questionController = require("../controller/question")
const router = express.Router()

router.get("/question", questionController.questionSend  )

exports.route = router