import React, { Component } from 'react';
import axios from 'axios';

import apiConfig from '../../api-config';

import './dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dashboard</h1>
                    <h3>Nome: { this.state.name }</h3>
                    <h3>Email: { this.state.email }</h3>
                    <h3>Phone: { this.state.phone }</h3>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const requestConfig = {
            headers: { 
                Authorization: sessionStorage.getItem('app-token') 
            }
        }

        axios.get(apiConfig.BASE_URL + '/', requestConfig)
        .then((response) => {
            this.setState({ 
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone
            });
        })
        .catch((error) => {

        });
    }
}

export default Dashboard;
