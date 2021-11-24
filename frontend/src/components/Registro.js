import { React, useState } from 'react';
import { useHistory } from 'react-router';

const initialForm = {
    username: "",
    password: ""
}

const Registro = () => {
    const token = window.localStorage.getItem("token");
    const URL = "http://localhost:3000/api/users/";
    const [form, setForm] = useState(initialForm)
    const {username, password} = form;
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!username || !password)) { //cadena vacia es TRUE!
            alert("Por favor, complete todos los campos!");
            return;
        }
        else if(password.length < 6){
            alert("Contrasenia muy corta!");
            return;
        }

        //VERIFICAR EXISTENCIA?

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": JSON.stringify(token)
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
            .catch(error => {
                alert("Hubo un error!")
            })
            .finally(() => {
                alert("Ya puedes iniciar sesión! :) <3");
                history.push("/");
            });
    }

    const handleChange = ({target})=>{
        setForm(() => {
            return {
                ...form,
                [target.name]: target.value
            }
        });
      }

    return (
       <>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="username"
                    placeholder="Usuario"
                    autoComplete="off"
                    value={username}
                    onChange={handleChange}
                    className="input is-rounded" 
                    style={{"margin-bottom":"5%"}}/>

                <input type="password"
                    name="password"
                    placeholder="Contrasenia"
                    autoComplete="off"
                    value={password}
                    onChange={handleChange}
                    className="input is-rounded" />

                <input className="button is-success" style={{"margin-top": "5%"}} type="submit" value="Registrarse"/>
            </form>
       </>
    )
}

export default Registro
