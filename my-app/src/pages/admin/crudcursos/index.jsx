import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Button, Table, Form} from 'react-bootstrap';
import {url} from '../../../utils/constants';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';


const CrudCursos = () => {
    const [idCurso, setIdCurso] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        listarCursos();
    }, []);

    const listarCursos = () => {
        fetch(url + '/cursos')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setIdCurso(0);
        setTitulo('');
    }


    const salvar = (event) => {
        event.preventDefault();

        const curso = {
           titulo : titulo,

        }
        let method = (idCurso === 0 ? 'POST' : 'PUT');
        let urlRequest = (idCurso === 0 ? `${url}/cursos` : `${url}/cursos/${idCurso}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(curso),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Curso salvo');

            listarCursos();
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/cursos/${event.target.value}`, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyons')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setIdCurso(dado.data.idCursos);
            setTitulo(dado.data.titulo);
            console.log(dado);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/cursos/${event.target.value}`,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Curso removida');

            listarCursos();
        })
    }

    return (
        <div style={{ background: '#00c2ee' }}>
            <Menu />
            <Container style={{ marginTop: '3em' }}>
            <Titulo
                titulo="Cursos"
                chamada="Gerenciar cursos"
            />
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicNome">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Titulo do curso"></Form.Control>
                            </Form.Group>
                            
                            <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table style={{ background: '#00d65f', borderRadius: '20px', marginTop: '4em' }} striped hover>
                    <thead>
                        <tr className="justify">
                            <th>Titulo</th>
                            <th>Instituição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.titulo}</td>
                                        <td>{item.instituicao?.nome}</td>
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
export default CrudCursos;
