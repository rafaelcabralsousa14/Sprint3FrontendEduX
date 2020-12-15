import React, { useEffect, useState } from 'react'
import { Container,Table, Form, Button, Card  } from 'react-bootstrap';
import { url } from '../../utils/constants'
import Menu from '../../components/menu'
import Rodape from '../../components/rodape'
import Titulo from '../../components/titulo'

const Turmas = () => {
    const [idTurma, setIdTurma] = useState(0);
    const [periodo, setPeriodo] = useState('');
    const [cursos, setCursos] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [descricao, setDescricao] = useState([]);


    useEffect(() => {
        listarCursos()
    }, []);

    const listarCursos = () => {
        fetch(url + 'turma')
            .then(response => response.json())
            .then(data => {
                setCursos(data.data);
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setIdTurma(0);
        setPeriodo('');
    }

    return (
        <div style={{ background: '#444444' }}>
            <Menu />
            <Container style={{ marginTop: '3em' }}>
                <Titulo
                    titulo="Turmas"
                    chamada="Veja sua(s) turma(s)"
                />
                <Table style={{ background: '#808080', borderRadius: '20px', marginTop: '4em' }} striped hover>
                    <thead>
                        <tr className="justify">
                            <th>Curso</th>
                            <th>Periodo</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cursos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.periodo}</td>
                                        <td>{item.nome}</td>
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

export default Turmas;
