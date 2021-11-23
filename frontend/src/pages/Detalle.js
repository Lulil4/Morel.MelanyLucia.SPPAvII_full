import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import {Link} from "react-router-dom"

const Detalle = () => {
    const {id} = useParams();
    const [mascota, setMascota] = useState({});
    const {nombre, edad, tipo, vacunado, observaciones} = mascota;

    useEffect(() => {
        const URL = "http://localhost:5000/mascotas/";
        
        fetch( URL + id)
        .then(res=>res.ok?res.json():Promise.reject(res.status + ": " + res.statusText))
        .then(mascota=>{
            setMascota(mascota);
            console.info(mascota);

        })
        .catch(err=>console.error(err));
    }, [id]);

    return (
        <div>
            <Link to="/">Volver</Link>
            <h1>{nombre}</h1>
            <h1>{edad}</h1>
            <h1>{tipo}</h1>
            <h1>Vacunado: {vacunado}</h1>
            <p>{observaciones}</p>
        </div>
    );
}

export default Detalle
