import React from 'react';

import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => 
<div className="app">
  <div className="">
    <div className="menu app-navbar">
      <a className="menu-item" href="/">Home</a>
      <a className="menu-item" href="/a-empresa">A Empresa</a>
      <a className="menu-item" href="/trabalhe-conosco">Trabalhe Conosco</a>
      <a className="menu-item" href="/solucoes">Soluções</a>
      <a className="menu-item" href="/contato">Contato</a>
      <div className="sign-in">
        <a className="internal" href="/login">Entrar</a>
      </div>
    </div>
  </div>
  <Routes />
  <div className="footer">

  </div>
</div>;

export default App;
