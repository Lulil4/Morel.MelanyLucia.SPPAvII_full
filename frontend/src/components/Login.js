import React from 'react';

const Login = ({ handleSubmit, handleChange, username, password }) => {

    return (
        <div className="form" onSubmit={handleSubmit}>
             <h1 className="title is-2" style={{"textAlign":"center", "color":"white", "WebkitTextStroke":"1px black", "marginTop": "5%"}}>Login</h1>
            <form>
                <input type="text" className="input" style={{ "marginBottom": "1vh" }} onChange={handleChange} name="username" value={username} placeholder="Usuario" />
                <input type="password" className="input" style={{ "marginBottom": "3vh" }} onChange={handleChange} name="password" value={password} placeholder="Contrasenia" />
                <input className="button is-success" type="submit" value="Iniciar sesión" />
            </form>
        </div>
    );
}

export default Login;
