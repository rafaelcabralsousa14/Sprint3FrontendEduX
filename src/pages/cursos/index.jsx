import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Button, Table, Form} from 'react-bootstrap';
import {url} from '../../utils/constants';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import Titulo from '../../components/titulo';


const Cursos = () => {
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

    return (
        <div style={{ background: '#00c2ee' }}>
            <Menu />
            <Container style={{ marginTop: '3em' }}>
            <Titulo
                titulo="Cursos"
                chamada="Gerenciar cursos"
            />
                <Table style={{ background: '#00d65f', borderRadius: '20px', marginTop: '4em' }} striped hover>
                    <thead>
                        <tr className="justify">
                            <th>Titulo</th>
                            <th>Instituição</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.titulo}</td>
                                        <td>{item.instituicao?.nome}</td>
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
export default Cursos;
