require("./db/mongo"); //automaticamente cuando levante el servidor, tengo la conexion a la db
const {PORT} = require("./utils/config");
const express = require("express"); 
const cors = require("cors"); 
const {handlerNotFound, handlerError, logger} = require("./utils/middleware"); 
const mascotasRouter = require("./routes/mascotasRouter");
const usersRouter = require("./routes/usersRouter");
const loginRouter = require("./routes/loginRouter");
const tiposRouter = require("./routes/tiposRouter");
const app = express();//aplico express

app.use(express.json()); //recordar los use
app.use(logger); //recordar los use. lo ejecuta al comienzo

app.get("/", (req, res)=>{
    //  res.send("Hola ");
    //  res.json(personas);
    res.send("<h1>API REST/servidor mascotis</h1>")
});

app.use(cors()); //recordar los use. CON PARENTESIS

app.use("/api/login", loginRouter);
app.use("/api/mascotas", mascotasRouter); //MANEJADOR DE RUTAS DE PERRIS
app.use("/api/users", usersRouter);
app.use("/api/tipos", tiposRouter);

app.use(handlerNotFound); //recordar el middleware , MANEJADOR RUTA QUE NO EXISTE
app.use(handlerError); //MANEJADOR DE ERRORES

app.listen(3000, ()=>{ //EL LEVANTADOR DE SERVER
    console.log("Servidor en puerto " + PORT);
});

//META: DEJAR EL INDEX PELADO PELADITO, LA LOGICA NO VA ACÁ