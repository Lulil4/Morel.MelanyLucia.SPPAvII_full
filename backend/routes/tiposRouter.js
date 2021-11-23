const Tipo = require("../models/Tipo");
const { verifyToken } = require("../utils/middleware");
const tiposRouter = require("express").Router();

//tiposRouter.use(verifyToken); 

tiposRouter.get("/", (req, res, next) => { 
    Tipo.find({}) 
        .then(tiposTraidos => {
            res.json(tiposTraidos); 
        })
        .catch(err => {
            next(err);
        });
});

tiposRouter.post("/", (req, res, next) => {
    const { descripcion } = req.body;

    const nuevoTipo = new Tipo({//el campo y el valor que le asigno se llaman igual entonces lo dejo asi sino con :
        descripcion
    });

    nuevoTipo.save() //guardo la instancia para mandarselo a mongo y automaticamente crea la coleccion personas
        .then(tipoCargado => {
            res.json(tipoCargado); //devuelvo el mascota creado al front
        })
        .catch(err => {
            next(err);
        });
});

module.exports = tiposRouter;
