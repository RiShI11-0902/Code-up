const mongosse = require("mongoose")

const connect = ()=>{
    main().catch(err => console.log(err))

   async function main(){
    await mongosse.connect(process.env.MONGO_URL)
    console.log("database connected");
   }
}

module.exports = connect