// Always required
const express = require("express")
const app = express()
const passport = require("passport")
//for connection to db
const connection = require("./databsaseConfig")

// initialize(passport)
connection()

//individual routes
const userRoutes = require("./routes/users")
app.use("/", userRoutes.route)

app.get("/" , function(req,res){
    res.send("Hello")
})

app.listen(8000);
