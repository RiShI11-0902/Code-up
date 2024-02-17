const model = require("../models/users")
const User = model.User
exports.createUser = async (req,res)=>{
    const user = new User();
    const { email,name,password } = req.body

    user.name = name
    user.email = email
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

