import { Link } from 'react-router-dom';
import Login from '../components/Login';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';

const initialForm = {
    username: "",
    password: ""
}

function LoginPage() {

    const tokenAntes = window.localStorage.getItem("token");
    const history = useHistory();
    const [form, setForm] = useState(initialForm);
    const { username, password } = form;
    const [isLoading, setIsLoading] = useState(false);
    const URL_LOGIN = "http://localhost:3000/api/login/";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(username && password)) {
            alert("Por favor, ingrese usuario y contrasenia");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            fetch(URL_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
                .then((user) => {
                    if (user === undefined) {
                        alert("Datos inválidos");
                        return;
                    }
                    const { token } = user;
                    window.localStorage.setItem("token", "Bearer " + token);
                    alert("Login exitoso!");
                    history.push("/home");
                })
                .catch(error => {
                    alert(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);
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
        <>
        {
            tokenAntes == null? isLoading ? (<div className="centrado"><Loader /></div>) : (<div className="centrado" style={{ width: "40%" }}>
            <Login handleChange={handleChange} handleSubmit={handleSubmit} username={username} password={password} />
            <button className="button is-primary"><Link to="/registro">Ir a registrarse</Link></button>
        </div>) : history.push("/home")
        }
            
                            
        </>
        
    );
}

export default LoginPage;