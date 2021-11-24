const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils/config");

const handlerNotFound = (req, res) => {
    res.status(404).json(
        {
            error: "No existe esa ruta."
        }
    );
};

const handlerError = (error, req, res, next)=>{ //middleware especial, es de express. puede atrapar errores! puedo lanzar errores despues desde los VERBOS HTTP. y el next para que siga corriendo el flujo del programa
    console.error(error.name); //me dice que error pasó en realidad, para poder armar los else if a medida que salen

    if(error.name === "CastError"){
        res.status(400).send({error:"Id invalido"});
    }
    else if(error.name === "SyntaxError"){
        res.status(400).send({error:"Error de sintáxis"});
    }
    else if(error.name === "ReferenceError"){
        res.status(400).send({error: error.name, message: error.message});
    }
    else if(error.name === "ValidationError"){
        res.status(400).send({error: error.name, message: error.message});
    }
    else if(error.name === "ErrorToken"){
        res.status(401).send({error: error.name, message: error.message});
    }
    else if(error.name === "JsonWebTokenError"){
        res.status(403).send({error: error.name, message: error.message});
    }
    else if(error.name === "TokenExpiredError"){
        res.status(401).send({error: error.name, message: error.message});
    }
    else if(error.name === "UsuarioExistenteError"){
        res.status(401).send({error: error.name, message: error.message});
    }
    else{
        res.status(500).send({error:"Error interno del sistema"});
    }
    console.error(error.message);
    next(error);
};
const logger = ((req, res, next) => {
    //me dira a que ruta se entro y con que metodo http
    console.log(req.path);
    console.log(req.method);
    //console.log(`Hay ${perros.length} en la lista`); //es sarasa
    next();
});

const verifyToken = async (req, res, next)=>{ 
    const bearerToken = req.headers["authorization"]; //asi me traigo el header

    if (bearerToken !== undefined && bearerToken != "null"){//puede que no este el token
        req.token = bearerToken.split(" ")[1];
        const len = req.token.length;
        req.token = req.token.substring(0, len-1)
        try{
            const data = await jwt.verify(req.token, SECRET); 
            next(); //le digo que siga siga
        }
        catch(error){
            next(error);
        }
    }
    else{
        next({name:"ErrorToken", message:"No Token"});
    }
    };

module.exports = {
    handlerNotFound, 
    handlerError,
    logger,
    verifyToken
};