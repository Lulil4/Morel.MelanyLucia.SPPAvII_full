import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from "react-router-dom"

const Detalle = () => {
    const { id } = useParams();
    const [mascota, setMascota] = useState({});
    const { nombre, edad, tipo, vacunado, observaciones } = mascota;

    useEffect(() => {
        const URL = "http://localhost:3000/api/mascotas/";

        fetch(URL + id)
            .then(res => res.ok ? res.json() : Promise.reject(res.status + ": " + res.statusText))
            .then(mascota => {
                setMascota(mascota);
                console.info(mascota);

            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <>
        <nav className="navbar">
                <Link to="/" className="navbar-item"><h1 className="title is-4"> Volver</h1></Link>
        </nav>
            <div className="centrado">
                <h2 className="title is-3" style={{"text-align":"center", "color":"white", "-webkit-text-stroke":"1px black"}}>Información de la Mascota</h2>
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            <p className="title is-5"><b>Nombre:</b> {nombre}</p>
                            <p className="title is-5"><b>Edad:</b> {edad} años</p>
                            <p className="title is-5"><b>Tipo:</b> {tipo}</p>
                            <p className="title is-5"><b>Vacunado:</b> {vacunado ? "Si" : "No"}</p>
                            <p className="title is-5"><b>Observaciones:</b> {observaciones ? observaciones : "No hay observaciones"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detalle
