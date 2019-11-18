import React, { Component} from 'react';
import { Button, Form, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

import apiConfig from '../../api-config';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stage: 'email-login',
            email: '', 
            password: '', 
            number: '', 
            pin: ''
        };
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row login-page">                        
                        <div className="mx-auto col-md-5 col-sm-8 login-form">
                            { this.state.stage === 'email-login' && (
                                <Form onSubmit={(e) => this.doLogin(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-input" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-input" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicLink">
                                        <Button variant="link" className="forgot-password">Esqueci minha senha</Button>
                                    </Form.Group>

                                    <Button type="submit">
                                        Entrar
                                    </Button>
                                </Form>
                            )}

                            { this.state.stage === 'send-2fa' && (
                                <Form onSubmit={(e) => this.send2FA(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control name="number" value={this.state.number} onChange={this.handleChange} type="tel" className="form-input" />
                                    </Form.Group>

                                    <ButtonGroup>
                                        <Button variant="info" onClick={() => this.setState({stage: 'email-login'})}>
                                            Voltar
                                        </Button>
                                        <Button type="submit">
                                            Enviar PIN
                                        </Button>
                                    </ButtonGroup>
                                </Form>
                            )}

                            { this.state.stage === 'confirm-pin' && (
                                <Form onSubmit={(e) => this.confirmPin(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>PIN</Form.Label>
                                        <Form.Control name="pin" value={this.state.pin} onChange={this.handleChange} type="tel" className="form-input" />
                                    </Form.Group>

                                    <ButtonGroup>
                                        <Button variant="info" onClick={() => this.setState({stage: 'send-2fa'})}>
                                            Voltar
                                        </Button>
                                        <Button type="submit">
                                            Confirmar PIN
                                        </Button>
                                    </ButtonGroup>
                                </Form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    doLogin = (e) => {
        e.preventDefault();
        const form = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post(apiConfig.BASE_URL + '/login', form)
        .then((response) => {
            const token = response.data.token;
            sessionStorage.setItem("app-token", token);
            this.setState({stage: 'send-2fa'});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    send2FA = (e) => {
        e.preventDefault();
        const form = {
            token: sessionStorage.getItem('app-token'),
            number: this.state.number
        };
        
        axios.post(apiConfig.BASE_URL + '/2fa', form)
        .then((response) => {
            const token = response.data.token;
            sessionStorage.setItem("app-token", token);
            this.setState({stage: 'confirm-pin'});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    confirmPin = (e) => {
        e.preventDefault();
        const form = {
            token: sessionStorage.getItem('app-token'),
            pin: this.state.pin
        };
        
        axios.post(apiConfig.BASE_URL + '/verify-2fa', form)
        .then((response) => {
            const token = response.data.permanentToken;
            sessionStorage.setItem("app-token", token);
            window.open('/', '_self');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default Login;
