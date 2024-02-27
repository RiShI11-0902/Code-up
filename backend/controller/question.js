const {Question} = require("../models/questions") 


exports.questionSend = async (req,res)=>{

    const question = await Question.find()
   
        res.json({question})
    
} 