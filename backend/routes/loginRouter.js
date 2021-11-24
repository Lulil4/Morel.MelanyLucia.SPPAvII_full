const loginRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils/config");

loginRouter.post("/", async(req, res, next)=>{ //HACEMOS EL LOGIN!
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username}); 
        const correctPass = user == null? false : await bcrypt.compare(password, user.passwordHash); //es asincrono
        //solo lo compara si el usuario no es null
        if ( !(user && correctPass)){ 
           return next({name: "ValidationError" , message:"password o username invalidos"});
        }

        const userToken =  {
            username: user.username,
            id: user._id,
        };

        //AGREGO TIEMPO DE EXPIRACION COMO SEGUNDO PARAM 
        const token = await jwt.sign(userToken, SECRET, {expiresIn: "12h"}); //agarra la palabra secreta, el usuario y genera el token
        //la palabra secreta esta en .env y la traigo desde config
        res.status(200).json({
            token,
            username
        });
    }
    catch(error){
        next(error);
    }
})


module.exports = loginRouter;
