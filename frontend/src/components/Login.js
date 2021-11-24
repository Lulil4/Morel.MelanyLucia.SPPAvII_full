import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Loader from '../components/Loader'

const initialForm = {
    username: "",
    password: ""
}

const Login = () => {
    const token = window.localStorage.getItem("token");
    const history = useHistory();
    const [form, setForm] = useState(initialForm);
    const { username, password } = form;
    const [isLoading, setIsLoading] = useState(false);
    const URL_LOGIN = "http://localhost:3000/api/login/";
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!(username && password)){
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
                if (res.ok){
                   return res.json();
                }
            })
            .then((user)=>{
                if (user === undefined){
                    alert("Datos inválidos");
                    return;
                }
                const {token} = user;
                window.localStorage.setItem("token", "Bearer " + token);
                alert("Login exitoso!");
                history.push("/home");
            })
            .catch(error=>{
                alert(error.message);
            })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);
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
            {
                token == null? (<div>
                {
                        isLoading ? (<Loader />) :
                            (<div className="form" onSubmit={handleSubmit}>
                            <form>
                                <input type="text" className="input" style={{"marginBottom":"1vh"}} onChange={handleChange} name="username" value={username} placeholder="Usuario" />
                                <input type="password" className="input" style={{"marginBottom":"3vh"}} onChange={handleChange}  name="password" value={password} placeholder="Contrasenia" />
                                <input className="button is-success" type="submit" value="Iniciar sesión"/>
                            </form>
                        </div>)
                    }
            </div>) : history.push("/home")
            }
        </>
        
    );
}

export default Login;
