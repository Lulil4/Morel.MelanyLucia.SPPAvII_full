import React from 'react'
import { Link } from 'react-router-dom';
import imgError from '../assets/error404.jpg';
const Error404 = () => {
    return (
        <div className="centrado">
        <img src={imgError} alt=""/>
        <button className="button is-primary"><Link to="/">Volver al login</Link></button>
        </div>
    )
}

export default Error404
