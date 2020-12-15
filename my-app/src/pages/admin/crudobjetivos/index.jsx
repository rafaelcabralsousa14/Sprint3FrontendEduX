import React, {useState, useEffect} from 'react';
import {url} from '../../../utils/constants'
import { Container,Table, Form, Button, Card } from 'react-bootstrap';
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo'

const CrudObjetivos = () => {

    const [idObjetivo, setId ] = useState(0);
    const [descricao, setDescricao] = useState('');
    // const [categoria, setCategoria] = useState('');
    const [objetivos, setObjetivos] = useState([]);


    useEffect(() => {
        listarObjetivos();
    },[]);

    const listarObjetivos= () => {
        fetch(`${url}/objetivos`, {
            headers : {             
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')         
        }
        })
        .then(response => response.json())
        .then(dados => {
            setObjetivos(dados.data);

            limparCampos();
        })
        .catch(err => console.error(err));
    }
    
    const limparCampos = () => {
            
            setId(0);    
            setDescricao('');
            // setCategoria('');
    }

    const salvar = (event) => {
        event.preventDefault();

        const objetivo = {
            // categoria : categoria, 
            descricao : descricao,
        }
    

    let method = (idObjetivo === 0 ? 'POST' : 'PUT');
    let urlRequest = (idObjetivo === 0 ? `${url}/objetivos` :  `${url}/objetivos/${idObjetivo}`);

    fetch(urlRequest, {
        method : method,
        body : JSON.stringify(objetivo),
        headers : {
            'content-type' : 'application/json',
            'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
        }
    })
    .then(response => response.json())
        .then(dados => {
           console.log(dados);
            alert('Objetivo salvo');

            listarObjetivos();
        })
        .catch(err => console.error(err))
    }
    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/objetivos' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
          
            setId(dado.idObjetivo)
            setDescricao(dado.descricao);
            // setCategoria(dado.categoria);
            console.log(dado);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/objetivos' + event.target.value,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Objetivo removido');

            listarObjetivos();
        })
    }


    return(
        <div style={{ background: '#444444' }}>
        <Menu />
        <Container style={{ marginTop: '3em' }}>
            <Titulo
                titulo="Objetivos"
                chamada="Gerenciar objetivos"
            />
            <Card >
                <Card.Body>
                    <Form onSubmit={event => salvar(event)}>                     
                        <Form.Group controlId="formBasicTitulo">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Descrição de Objetivo" />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicTitulo">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type="text" value={categoria} onChange={event => setCategoria(event.target.value)} placeholder="Categoria do Objetivo" />
                        </Form.Group> */}
                        <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Table style={{ background: '#808080', borderRadius: '20px', marginTop: '4em' }} striped hover>
                <thead>
                    <tr className="justify">
                        <th>Descrição</th>
                        {/* <th>Categoria</th> */}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                        objetivos.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.descricao}</td>
                                    {/* <td>{item.categoria}</td> */}
                                    <td style={{ display: 'flex' }}>
                                        <Button variant="info" value={item.idObjetivo} onClick={event => editar(event)} >Editar</Button>
                                        <Button variant="danger" value={item.idObjetivo} onClick={event => remover(event)} style={{ marginLeft: '20px' }}>Remover</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
        <Rodape />
    </div>
)
}
export default CrudObjetivos;