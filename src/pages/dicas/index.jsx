import React, {useState, useEffect} from 'react';
import { Container,Button, Card, Table, Form} from 'react-bootstrap';
import { url } from '../../utils/constants';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import Titulo from '../../components/titulo';

const Dicas = () => {
    const [idDica, setId] = useState(0);
    const [texto, setTexto] = useState('');
    const [imagem, setImagem] = useState('');
    const [dicas, setDicas] = useState([]);

    useEffect(() => {
        ListarDicas();
    }, []);

    const ListarDicas = () => {
        fetch(url + '/dicas')
            .then(response => response.json())
            .then(data => {
                setDicas(data.data)
                limparCampos();
            })
            .catch(err => console.error(err));
    }

    const limparCampos = () => {
        setId(0);
        setTexto('');
        setImagem(0);
    }

    const uploadFile = (event) => {
        event.preventDefault();

        let formdata = new FormData();

        formdata.append('arquivo', event.target.files[0]);

        fetch(`${url}/upload`,{
            method : 'POST',
            body : formdata
        })
        .then(response => response.json())
        .then(data => {
            setImagem(data.url);
        })
        .catch(err => console.log(err))

    }

    const salvar = (event) => {
        event.preventDefault();

        const dicas = {
            texto : texto,
            imagem : imagem,
        }
        let method = (idDica === 0 ? 'POST' : 'PUT');
        let urlRequest = (idDica === 0 ? `${url}/dicas` : `${url}/dicas/${idDica}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(dicas),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dicas => {
            alert('Dica salva');

            ListarDicas();
        })
        .catch(err => console.error(err))
    }

    const editar = (event) => {
        event.preventDefault();

        fetch(`${url}/dicas/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.idDica);
            setTexto(dado.texto);
            setImagem(dado.imagem);
            console.log(dado);
        })
    }

    const remover = (event) => {
        event.preventDefault();

        fetch(`${url}/cursos/${event.target.value}`,{
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert(' Dica removida');

            ListarDicas();
        })
    }

    return (
        <div style={{ background: '#444444' }}>
        <Menu />
        <Container style={{ marginTop: '3em' }}>
            <Titulo
                titulo="Dicas"
                chamada="Veja e adicione dicas"
            />
            <Card >
                <Card.Body>
                    <Form onSubmit={event => salvar(event)}>                     
                        <Form.Group controlId="formBasicTitulo">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control type="text" value={texto} onChange={event => setTexto(event.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicTitulo">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control type="text" value={imagem} onChange={event => setImagem(event.target.value)} />
                        </Form.Group>
                        <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }}>Salvar</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Table style={{ background: '#808080', borderRadius: '20px', marginTop: '4em' }} striped hover>
                <thead>
                    <tr className="justify">
                        <th>Texto</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                        dicas.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.texto}</td>
                                    <td>{item.imagem}</td>
                                    <td style={{ display: 'flex' }}>
                                        <Button variant="info" value={item.idDica} onClick={event => editar(event)} >Editar</Button>
                                        <Button variant="danger" value={item.idDica} onClick={event => remover(event)} style={{ marginLeft: '20px' }}>Remover</Button>
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
export default Dicas;