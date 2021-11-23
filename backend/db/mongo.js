const {connect} = require("mongoose");
const {DB_URI} = require("../utils/config");

const conectarDB = async()=>{ //si declaro una funcion asincrona debe devolver una promesa
    connect(DB_URI);
};

conectarDB()
.then(result=>{
    console.info("db conectada");
})
.catch((err)=>{
    console.error("error al conectar al a db");
});