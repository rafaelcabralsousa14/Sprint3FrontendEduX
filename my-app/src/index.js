import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NaoEncontrado from './pages/naoencontrado';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Cadastrar from './pages/cadastrar';
import Objetivos from './pages/objetivos';
import Home from './pages/home';
import Cursos from './pages/cursos';
import Login from './pages/login';
import Turmas from './pages/turmas';
import CrudCursos from './pages/admin/crudcursos';
import CrudObjetivos from './pages/admin/crudobjetivos';
import CrudTurmas from './pages/admin/crudturmas';
import Dicas from './pages/dicas';

const RotaPrivada = ({component : Component, ...rest}) => (
  <Route 
    {...rest}
    render = { props => 
        localStorage.getItem('token-nyous') !== null ? 
          (<Component {...props} />) : 
          (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />)
    }
  />
);

const RotaPrivadaAdmin = ({component : Component, ...rest}) => (
  <Route 
    {...rest}
    render = { props => 
        localStorage.getItem('token-edux') !== null && jwt_decode(localStorage.getItem('token-edux')).role === 'Admin' ? 
          (<Component {...props} />) : 
          (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />)
    }
  />
);

const routing = (
  <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home}  />
          <Route path='/login' component={Login} />
          <Route path='/cadastrar' component={Cadastrar} />
          <Route path='/objetivos' component={Objetivos} />
          <Route path='/admin/crudobjetivos' component={CrudObjetivos} />
          <Route path='/cursos' component={Cursos} />
          <Route path='/admin/crudcursos' component={CrudCursos} />
          <Route path='/turmas' component={Turmas} />
          <Route path='/admin/crudturmas' component={CrudTurmas} />
          <Route path='/dicas' component={Dicas} />
          <Route component={NaoEncontrado} />
        </Switch>
      </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// ReactDOM.render(
//   <Router>
//     <Switch>
//       <Route path="/" exact={true} component={Home} />
//       <Route path="/login" component={Login} />
//       <Route path="/cadastrar" component={Cadastrar} />
//       <Route path="/turma" component={CrudTurma} />
//       <Route path="/cursos" component={Cursos} />
//       <Route path="/objetivos" component={Objetivos} />
//     </Switch>
//   </Router>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
