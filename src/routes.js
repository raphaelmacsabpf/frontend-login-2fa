import React from 'react';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { isAuthenticated } from './auth';

import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component { ...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/documentacao" component={() => <h1>Documentação</h1>} />
            <Route exact path="/suporte" component={() => <h1>Suporte</h1>} />
            <PrivateRoute exact path="/" component={ Dashboard } />
        </Switch>
    </BrowserRouter>
);

export default Routes;