const User = require("../models/User");
const usersRouter = require("express").Router();
const { verifyToken } = require("../utils/middleware");

const bcrypt = require("bcrypt");

//usersRouter.use(verifyToken); sino no puedo hacer registro

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

        const usuarioExiste = await User.find({"username" : username});
        
        if (usuarioExiste[0]){
            return next({ name: "UsuarioExistenteError", message: "El usuario ya existe!" });

        }

        const saltRounds = 10;

        if (password.length < 5) {
            return next({ name: "ValidationError", message: "Contrasenia muy corta" });
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

usersRouter.get("/:username", async(req, res, next) => {

    try {
        const usernameABuscar = req.params.username;

        const user = await User.find({username : usernameABuscar});
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }

});

module.exports = usersRouter;