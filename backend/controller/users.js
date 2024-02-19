const model = require("../models/users")
const User = model.User

exports.createUser = async (req,res)=>{
    const user = new User();
    const { username,name,password } = req.body

    user.name = name
    user.username = username
    user.password = password

    try {
        await user.save();
        // req.login( user, (err)=>{
        //     if(err) return res.json({error: err})
        //     res.status(201).json({id: user._id, name: user.name});
        // })
        req.login(user, (err)=>{
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(201).json({id: user._id, name: user.name});
            }
        })
    } catch (error) {
        console.log(error);
    }
}


exports.loginUser =  (req,res)=>{
    const user = req.user
    // console.log(req.user.id);
    res.status(200).json({name: user.name, id: user.id})
    // console.log(req.body.name);
}
