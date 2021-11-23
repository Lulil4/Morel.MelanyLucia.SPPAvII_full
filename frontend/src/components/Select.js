import React from 'react'

const Select = ({ tiposMascota, handleChange }) => {
    return (
        <div class="select">
            <select
                name="tipo"
                onChange={handleChange}>
                {
                    tiposMascota.map(tipoMascota => {
                        return <option
                            key={tipoMascota.id}
                            value={tipoMascota.descripcion}
                        >
                            {tipoMascota.descripcion}</option>
                    })
                }
            </select>
        </div>
    );
};

export default Select;