import React from 'react'

const Row = ({mascota, setMascotaEdit, deleteMascota, irDetalle}) => {
    const {id, nombre, tipo} = mascota;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
             <button style={{"marginRight":"10px"}} className="button is-success is-light" onClick={() => {irDetalle(id)}}>Detalle </button>
             <button style={{"marginRight":"10px"}} className="button is-warning is-light" onClick={() => {setMascotaEdit(mascota)}}>Update</button>
             <button className="button is-danger is-light" onClick={() => {deleteMascota(id)}}>Delete </button>
            </td>
        </tr>
    )
}

export default Row
