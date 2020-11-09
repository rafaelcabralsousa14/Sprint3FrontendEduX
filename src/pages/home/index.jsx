import React from 'react'
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import Titulo from '../../components/titulo';
import {Carousel, Button} from 'react-bootstrap';
import Banner from '../../assets/img/BannerCerto.jpeg';

const Home = () => {
    return(
        <div>
            <Menu />
                <div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={Banner}
                            alt="EduX"
                            />
                            <Carousel.Caption>
                            <h3 style={{color : '#00c2ee'}}>CONHEÇA EDUX</h3>
                            <p style={{color : '#00c2ee'}}>Aprenda melhor e se divirta!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="center">
                    <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }} href="/login">Login</Button>
                    <Button type="submit" style={{ background: '#00d65f', borderColor: '#00d65f' }} href="/cadastrar">Cadastrar</Button>
                </div>
            <Rodape />
        </div>
    )
}

export default Home;