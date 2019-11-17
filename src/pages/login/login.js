import React, { Component} from 'react';
import { Button, Form, ButtonToolbar } from 'react-bootstrap';
import './login.css';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row login-page">                        
                        <div className="mx-auto col-md-5 col-sm-8 login-form">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" className="form-input" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" className="form-input" />
                                </Form.Group>
                                <Form.Group controlId="formBasicLink">
                                    <Button variant="link" className="forgot-password">Esqueci minha senha</Button>
                                </Form.Group>
                                <div className="sign-in">
                                    <a className="internal" href="/login">Entrar</a>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
