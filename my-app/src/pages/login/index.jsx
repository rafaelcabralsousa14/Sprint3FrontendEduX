import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {url} from '../../utils/constants';
import logo from '../../assets/img/logo_2.png';
import { Container, Form, Button } from 'react-bootstrap';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import './index.css';

const Login = () => {
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`);

        const login = {
            email : email,
            senha : senha
        }

        fetch(url + '/login',{
            method : 'POST',
            body : JSON.stringify(login),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }

            alert('Dados inválido')
        })
        .then(data => {
            localStorage.setItem('token-edux', data.token)

            let usuario = jwt_decode(data.token);

            if(usuario.role === 'Admin'){
                history.push('/dashboard');
            } else {
                history.push('/home')
            }
            
        })
        .catch(err => console.error(err))
    }
    
    return (
        <div>
            <Menu />
            <Container className='form-height'>
                <Form className='form-signin' onSubmit={event => logar(event)} >
                    <div className='text-center'>
                     <img src={logo} alt='EduX' style={{ width : '64px'}} />
                    </div>
                    <br/>
                    <small>Coloque seus dados</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)}  required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta!</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )

}

export default Login;