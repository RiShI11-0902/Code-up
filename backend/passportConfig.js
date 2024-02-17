const passport_local = require("passport-local")
const {User} = require("./models/users")
const passport = require("passport")

exports.initialize =  (passport)=>{
    passport.use(
        new passport_local( async (email, password, next)=>{
            try {
                const findUser = await User.findOne({email})
                if(!findUser) return next(false,null);
                if(password != findUser.password) return next(false,null);

                next(false, findUser)
            } catch (error) {
                next(error,false)
            }
        })
    )
    passport.serializeUser((user,next)=>{
        next(null,user.id)
    })
    passport.deserializeUser(async (id,next) =>{
        try {
            const user = await User.findById(id)
            return next(null,user)
            
        } catch (error) {
            return next(error,false)
        }
    })
}