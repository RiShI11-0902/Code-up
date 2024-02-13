const mongosse = require("mongoose")

const connect = ()=>{
    main().catch(err => console.log(err))

   async function main(){
    await mongosse.connect("mongodb+srv://rishi:nrarVWGs6IJLpADk@cluster0.sirc6hl.mongodb.net/code-up?retryWrites=true&w=majority")
    console.log("database connected");
   }
}

module.exports = connect