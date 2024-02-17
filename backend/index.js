// Always required
const express = require("express")
const app = express()
const passport = require("passport")
const cors = require("cors")
const parser = require("body-parser")
//for connection to db
const connection = require("./databsaseConfig")
const { initialize } = require("./passportConfig")
const session = require("express-session")

//middleware
app.use(cors())
app.use(express.json())

//calling passport and db
initialize(passport)
connection()

//sesssion creation
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret:"mkldfj"
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
