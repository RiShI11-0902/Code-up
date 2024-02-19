const express = require("express")
const { isAuthenticated } = require("../passportConfig")

const router = express.Router()

router.get("/checkuser", isAuthenticated)

exports.route = router