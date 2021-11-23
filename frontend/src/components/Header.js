import React, { Component } from 'react';
import Titulo from './Titulo';
import logo from '../assets/fotitoHeader.jpg'

class Header extends Component {
    render() { 
        return (
        <header>
            <div className="centrado">
            <img className="fotitoHeader" src={logo} alt="Logo de la página"/>
            <Titulo titulo={this.props.titulo}/>
            </div>
        </header>
        );
    }
}
 
export default Header;