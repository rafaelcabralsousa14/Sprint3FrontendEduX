import React from 'react';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';

const NaoEncontrado = ( ) => {
    return (
        <div>
            <Menu />
                <div style={{marginTop : '200px', fontSize : '90px'}}>
                    <h1 className="text-center">404</h1>
                    <p className="text-center">Página não encontrada</p>
                </div>
            <Rodape />
        </div>
    )
}

export default NaoEncontrado;