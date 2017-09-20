import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import HeaderIntro from './HeaderIntro';
import SignUp from './SignUp';
import Verification from './Verification';
import ACreationStepFirst from './ACreationStepFirst';
import ACreationStepSec from './ACreationStepSec';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/*<HeaderIntro/>*/}
                    <Switch>
                        <Route exact path="/"/>
                        <Route path="/home" component={Dashboard}/>
                        <Route path="/how_it_works" component={Dashboard}/>
                        <Route path="/projects" component={Dashboard}/>
                        <Route path="/specialist_profiles" component={Dashboard}/>
                        <Route path="/contact" component={Dashboard}/>
                        <Route path="/qas" component={Dashboard}/>
                        <Route path="/sign_up" component={SignUp}/>
                        <Route path="/verification" component={Verification}/>
                        <Route path="/action_creation_1" component={ACreationStepFirst}/>
                        <Route path="/action_creation_2" component={ACreationStepSec}/>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
