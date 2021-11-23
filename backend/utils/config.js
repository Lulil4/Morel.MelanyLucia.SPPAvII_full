require("dotenv").config(); //le pido que traiga el objeto e invoque a la funcion config. esto agrega a la variable entorno process.env lo qeu tenga en ese paquete.

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const SECRET = process.env.SECRET;

module.exports = {
    PORT,
    DB_URI,
    SECRET
};