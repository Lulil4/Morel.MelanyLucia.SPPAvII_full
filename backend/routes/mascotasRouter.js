const Mascota = require("../models/Mascota");
const { verifyToken } = require("../utils/middleware");
const mascotasRouter = require("express").Router();

//mascotasRouter.use(verifyToken); 
//NOTA:
//para que antes de TODAS LAS RUTAS  se verifique el toquen
//SI LO BORRO Y PONGO:
//mascotasRouter.get("/", verifyToken, (req, res, next) 
//BLOQUEO POR RUTAS!! 

mascotasRouter.get("/", (req, res, next) => { //el /api/mascotas ya no va!!! 
    Mascota.find({}) 
        .then(mascotasTraidos => {
            res.json(mascotasTraidos); 
        })
        .catch(err => {
            next(err);
        });
});

mascotasRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Mascota.findById(id).then(mascotaTraido => {
        if (mascotaTraido) {
            res.json(mascotaTraido); //es como un return, se va cuando llega a la res
        }
        res.status(404).end();//no encontro
    })
        .catch(err => { //mongoose llama a la funcion validobjectid, si no es valido porque es mayor o menor su tamanio lo manda al catch
            next(err);
        });
});

mascotasRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;

    Mascota.findByIdAndRemove(id).then((result) => {
        if (result) {
            res.status(204).end();
        }
        res.status(404).end();
    })
        .catch(err => {
            next(err);
        });
});

mascotasRouter.post("/", (req, res, next) => {
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;

    const nuevoMascota = new Mascota({//el campo y el valor que le asigno se llaman igual entonces lo dejo asi sino con :
        nombre,
        edad,
        tipo,
        vacunado,
        observaciones
    });

    nuevoMascota.save() //guardo la instancia para mandarselo a mongo y automaticamente crea la coleccion personas
        .then(mascotaCargado => {
            res.json(mascotaCargado); //devuelvo el mascota creado al front
        })
        .catch(err => {
            next(err);
        });
});

mascotasRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;
    const infoMascota = { nombre, edad, tipo, vacunado, observaciones };// ASI ME FUNCIONA IGUAL!!
    console.info(observaciones);
    /*  BAUS JORDAN LO HACE ASI, NO SE SI HACE FALTA:
    const infoMascota = {};
      
      if (nombre){
          infoMascota.nombre = nombre;
      }
  
      if (edad){
          infoMascota.edad = edad;
      }*/

    Mascota.findByIdAndUpdate(id, infoMascota, { new: true })
        .then(mascotaModificado => { 
            //ES EL OBJETO ANTES DEL CAMBIO si no pongo el tercer parametro new true!!
            //pero con new true me devuelve los campos que NO envio modificados en NULL!!!
            if (mascotaModificado) {
                res.json(mascotaModificado);
            }
            res.status(400).end();
        })
        .catch(err => {
            next(err);
        })
});

module.exports = mascotasRouter;