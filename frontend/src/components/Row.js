import React from 'react'

const Row = ({mascota, setMascotaEdit, deleteMascota, irDetalle}) => {
    const {id, nombre, tipo} = mascota;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
             <button onClick={() => {setMascotaEdit(mascota)}}>Update</button>
             <button onClick={() => {deleteMascota(id)}}>Delete </button>
             <button onClick={() => {irDetalle(id)}}>Detalle </button>
            </td>
        </tr>
    )
}

export default Row
