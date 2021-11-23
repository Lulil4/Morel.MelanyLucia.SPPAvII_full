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
            if(target.checked){
                setForm(() => {
                    return {
                        ...form,
                        [target.name]: true
                    }
                });
            }
            else{
                setForm(() => {
                    return {
                        ...form,
                        [target.name]: false
                    }
                });
            }

        }
        else{
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
            <h2>{id ? "Update Mascota" : "Add Mascota"}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="nombre"
                    placeholder="Nombre"
                    autoComplete="off"
                    value={nombre}
                    onChange={handleChange} />

                <input type="number"
                    name="edad"
                    placeholder="Edad"
                    autoComplete="off"
                    onChange={handleChange}
                    value={edad} />

                <input type="checkbox" name="vacunado" onChange={handleChange} checked={vacunado}/>

                <Select tiposMascota={tiposMascota} handleChange={handleChange} />

                <textarea
                    value={observaciones}
                    name="observaciones"
                    onChange={handleChange} />

                <input type="submit" value="Enviar" />
                <input type="reset" value="Limpiar" onClick={handleReset} />
            </form>
        </>
    )
}

export default Formulario
