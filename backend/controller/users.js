const model = require("../models/users")
const User = model.User
exports.createUser = async (req,res)=>{
    const user = new User();
    user.name = "Rishi";
    user.email = "rbagade911@gmail.com";
    user.password = "1234"
    await user.save()
    console.log("User created");
}

