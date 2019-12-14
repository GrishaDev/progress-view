import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import App from './App';

export default function Init() {

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/app' component={App} />
            </Switch>
        </Router>
    )
}