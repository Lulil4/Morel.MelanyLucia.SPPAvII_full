import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import Registro from "../components/Registro"
import { useHistory } from 'react-router';
import Loader from '../components/Loader';

const initialForm = {
    username: "",
    password: ""
}

const RegistroPage = () => {
    const URL = "http://localhost:3000/api/users/";
    const [form, setForm] = useState(initialForm)
    const { username, password } = form;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!username || !password)) { //cadena vacia es TRUE!
            alert("Por favor, complete todos los campos!");
            return;
        }
        else if (password.length < 6) {
            alert("Contrasenia muy corta!");
            return;
        }
        setIsLoading(true);

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(res => {
                res.json();
                console.info(res);
                if (res.status === 401){
                    alert("El usuario ya existe! Olvidaste la contrasenia?");
                    return;
                }
                alert("Ya puedes iniciar sesión! :) <3");
            })
            .catch(error => {
                alert("Error: " + error.message)
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    const handleChange = ({ target }) => {
        setForm(() => {
            return {
                ...form,
                [target.name]: target.value
            }
        });
    }

    return (
        <div className="centrado" style={{ width: "40%" }}>
            {
                isLoading ? (<div className="centrado"><Loader /></div>) :
                    (
                        <>
                        <Registro handleChange={handleChange} handleSubmit={handleSubmit} username={username} password={password} />
                        <button className="button is-primary"><Link to="/">Volver al login</Link></button>
                        </>
                    )
            }
        </div>
    )
}

export default RegistroPage
