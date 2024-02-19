// Always required
const express = require("express")
const app = express()
const passport = require("passport")
const cors = require("cors")
const parser = require("body-parser")
//for connection to db
const connection = require("./databsaseConfig")
const { initializePaasport } = require("./passportConfig")
const session = require("express-session")

initializePaasport(passport)
connection()

//middleware
app.use(cors())
app.use(express.json())

//calling passport and db

//sesssion creation
app.use(session({
    secret:"mkldfj",
    saveUninitialized: false,
    resave: false,
}))
app.use(passport.initialize())
app.use(passport.session())

//individual routes
const userRoutes = require("./routes/users")
app.use("/user", userRoutes.route)

app.get("/" , function(req,res){
    res.send("Hello")
})

app.listen(8000);
