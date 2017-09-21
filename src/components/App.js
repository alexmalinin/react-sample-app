import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import HeaderIntro from './HeaderIntro';
import SignUp from './SignUp';
import Verification from './Verification';
import SpecialistsWelcome1 from './SpecialistWelcome1';
import SpecialistsWelcome2 from './SpecialistWelcome2';
import ClientWelcome from './ClientWelcome.js';
import SpecialistsProfile from './SpecialistsProfile.js';

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
                        <Route path="/specialists/dashboard/welcome-to-the-village-1" component={SpecialistsWelcome1}/>
                        <Route path="/specialists/dashboard/welcome-to-the-village-2" component={SpecialistsWelcome2}/>
                        <Route path="/client/dashboard/welcome-to-the-village" component={ClientWelcome}/>
                        <Route path="/specialists/dashboard/profile" component={SpecialistsProfile}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
