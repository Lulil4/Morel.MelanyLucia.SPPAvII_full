import React, { Component } from 'react';
import Titulo from './Titulo';
import logo from '../assets/20210611_154447.jpg'

class Header extends Component {
    render() { 
        return (
        <header>
        <img className="fotitoHeader" src={logo} alt="Logo de la página"/>
        <Titulo titulo={this.props.titulo}/>
        </header>
        );
    }
}
 
export default Header;