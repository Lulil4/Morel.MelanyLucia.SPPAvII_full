const User = require("../models/User");
const usersRouter = require("express").Router();
const { verifyToken } = require("../utils/middleware");

const bcrypt = require("bcrypt"); 

usersRouter.use(verifyToken); 

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body; 
        const saltRounds = 10;

        if (password.length !== 6){
           return next({name: "ValidationError", message: "No tiene 6 caracteres"});
        }
        const passwordHash = await bcrypt.hash(password, saltRounds); //esta el hash y el hashsync

        const user = new User({
            username,
            passwordHash,
        });

        const userSaved = await user.save(); 
        res.status(201).json(userSaved);

    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;