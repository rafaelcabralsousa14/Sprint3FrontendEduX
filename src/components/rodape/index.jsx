import React from 'react';
import { Navbar } from 'react-bootstrap';

const Rodape = () => {
    return (
        <footer className="text-center" style={{ marginTop : '30px', backgroundColor : "#F2F2F2", height : '130px', paddingTop : '20px'}}>
            <h1>Senai Informática 132</h1>
            <small>Desenvolvido por <a href="https://github.com/rafaelcabralsousa14">Rafael Cabral</a>, <a href="https://github.com/ana-111">Ana</a>, <a href="https://github.com/gustavobalbino04">Gustavo Balbino</a>, <a href="https://github.com/iRossiofc">Gabriel Rossi</a> e <a href="https://github.com/pacristof">Pamela Cristofoletti</a></small>
        </footer>
    )
}

export default Rodape;