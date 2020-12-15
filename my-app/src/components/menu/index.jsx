import React from 'react';
import { useHistory} from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/img/logo_2.png';
import jwt_decode from 'jwt-decode';

const Menu = () => {
    const history = useHistory();

    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem('token-edux');

        history.push('/');
    }

    const renderMenu = () => {
        const token = localStorage.getItem('token-edux');

        if(token === null){
            return (
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                </Nav>
            )
        } else if( jwt_decode(token).role === 'Admin' ){
            return (
                <Nav>
                    <Nav.Link href="/admin/crudturmas">Turmas</Nav.Link>
                    <Nav.Link href="/admin/crudobjetivos">Objetivos</Nav.Link>
                    <Nav.Link href="/admin/crudcursos">Cursos</Nav.Link>
                    <Nav.Link href="/dicas">Dicas</Nav.Link>
                    <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={event => sair(event)} >Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <Nav.Link href="/turmas">Turmas</Nav.Link>
                    <Nav.Link href="/objetivos">Objetivos</Nav.Link>
                    <Nav.Link href="/cursos">Cursos</Nav.Link>
                    <Nav.Link href="/dicas">Dicas</Nav.Link>
                    <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={event => sair(event)}>Sair</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
    }

    return (
        <Navbar style={{backgroundColor : "00d65f"}} expand="lg">
            <Navbar.Brand href="/"><img src={logo} alt='EduX' style={{ width : '64px'}} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                { renderMenu() }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu;