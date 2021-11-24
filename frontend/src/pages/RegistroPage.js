import { React } from 'react'
import { Link } from 'react-router-dom'
import Registro from "../components/Registro"


const RegistroPage = () => {

    return (
        <div className="centrado" style={{width:"40%"}}>
            <h1 className="title is-3" style={{"text-align":"center", "color":"white", "-webkit-text-stroke":"1px black", "margin-top": "5%"}}>Registrarse</h1>
        <Registro/>
        <button className="button is-primary"><Link to="/">Volver al login</Link></button>
        </div>
    )
}

export default RegistroPage
