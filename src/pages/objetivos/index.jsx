import React, {useState, useEffect} from 'react';
import {url} from '../../utils/constants'
import { Container,Table, Form, Button, Card } from 'react-bootstrap';
import Menu from '../../components/menu'
import Rodape from '../../components/rodape'
import Titulo from '../../components/titulo'

const Objetivos = () => {

    const [idObjetivo, setId ] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [objetivos, setObjetivos] = useState([]);


    useEffect(() => {
        listarObjetivos();
    },[]);

    const listarObjetivos= () => {
        fetch(`${url}/objetivo`, {
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
            setCategoria('');
    }

    return(
        <div style={{ background: '#444444' }}>
        <Menu />
        <Container style={{ marginTop: '3em' }}>
            <Titulo
                titulo="Objetivos"
                chamada="Veja os objetivos requisitados"
            />
            <Table style={{ background: '#808080', borderRadius: '20px', marginTop: '4em' }} striped hover>
                <thead>
                    <tr className="justify">
                        <th>Descrição</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                {
                        objetivos.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.descricao}</td>
                                    <td>{item.categoria}</td>
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
export default Objetivos;