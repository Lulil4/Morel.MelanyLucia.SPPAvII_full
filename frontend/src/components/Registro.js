import { React} from 'react';

const Registro = ({handleChange, handleSubmit, username, password}) => {
   

    return (
       <>
       <h1 className="title is-2" style={{"textAlign":"center", "color":"white", "WebkitTextStroke":"1px black", "marginTop": "5%"}}>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="username"
                    placeholder="Usuario"
                    autoComplete="off"
                    value={username}
                    onChange={handleChange}
                    className="input is-rounded" 
                    style={{"marginBottom":"5%"}}/>

                <input type="password"
                    name="password"
                    placeholder="Contrasenia"
                    autoComplete="off"
                    value={password}
                    onChange={handleChange}
                    className="input is-rounded" />

                <input className="button is-success" style={{"marginTop": "5%"}} type="submit" value="Registrarse"/>
            </form>
       </>
    )
}

export default Registro
