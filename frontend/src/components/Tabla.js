import React from 'react'
import Row from './Row'

const Tabla = ({data, setMascotaEdit, deleteMascota, irDetalle}) => {
    return (
        <>
        <h2>Mascotas List</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                </tr>
                </thead>
                <tbody>
                {
                    !data.lenght ? (data.map(mascota=> <Row key={mascota.id} mascota={mascota} irDetalle={irDetalle} setMascotaEdit={setMascotaEdit} deleteMascota={deleteMascota}/>)) : <tr><td colSpan={3}>There are no movies. Sorry!</td></tr>
                }
                </tbody>
        </table>
        </>
    )
}

export default Tabla
