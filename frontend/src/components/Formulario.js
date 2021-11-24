import { React, useState, useEffect } from 'react'
import Select from './Select';

const initialForm = {
    id: null,
    nombre: "",
    edad: "",
    tipo: "Perro",
    observaciones: "",
    vacunado: false
}

const Formulario = ({ createMascota, updateMascota, mascotaEdit, setMascotaEdit, tiposMascota }) => {
    const [form, setForm] = useState(initialForm);
    const { id, nombre, edad, vacunado, observaciones } = form;

    useEffect(() => {
        if (mascotaEdit) {
            setForm(mascotaEdit);
        }
    }, [mascotaEdit])

    const handleChange = ({ target }) => {

        if (target.name === "vacunado") {
            if (target.checked) {
                setForm(() => {
                    return {
                        ...form,
                        [target.name]: true
                    }
                });
            }
            else {
                setForm(() => {
                    return {
                        ...form,
                        [target.name]: false
                    }
                });
            }

        }
        else {
            setForm(() => {
                return {
                    ...form,
                    [target.name]: target.value
                }
            });
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !edad) { //cadena vacia es TRUE!
            alert("Por favor, complete todos los campos!");
            return;
        }
        if (!id) {
            createMascota(form);
            console.log("Enviando...");
        }
        else {
            updateMascota(form);
        }

        handleReset();

    }

    const handleReset = (e) => {
        setForm(initialForm);
        setMascotaEdit(null);
    }

    return (
        <>
            <div className="columns is-centered">
                <div className="column is-6">
                    <h2 style={{"textAlign":"center", "color":"white", "WebkitTextStroke":"1px black"}} className="title is-3">{id ? "Update Mascota" : "Add Mascota"}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            name="nombre"
                            placeholder="Nombre"
                            autoComplete="off"
                            value={nombre}
                            onChange={handleChange}
                            className="input is-rounded" />

                        <input type="number"
                            name="edad"
                            placeholder="Edad"
                            autoComplete="off"
                            onChange={handleChange}
                            value={edad}
                            className="input is-rounded"
                            style={{ "marginTop": "5%" }} />


                        <label style={{"textAlign":"center", "color":"white", "WebkitTextStroke":"1px black", "marginTop": "5%"}} className="title is-4" htmlFor="vacunado">Vacunado: <input type="checkbox" name="vacunado" onChange={handleChange} checked={vacunado} /></label>

                        <Select tiposMascota={tiposMascota} handleChange={handleChange} />

                        <textarea
                            className="textarea is-warning"
                            placeholder="Observaciones, es opcional"
                            value={observaciones}
                            name="observaciones"
                            onChange={handleChange}
                            style={{ "marginTop": "5%" }} />
                        <div style={{ display: "flex" }}>
                            <input style={{"marginRight":"5%", "marginTop":"5%"}} className="button is-warning is-light" type="reset" value="Limpiar" onClick={handleReset} />
                            <input style={{"marginTop":"5%"}} className="button is-success is-light" type="submit" value="Enviar" />
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}

export default Formulario
