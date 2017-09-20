import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/"/>
                        <Route path="/dashboard" component={Dashboard}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
