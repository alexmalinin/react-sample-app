import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Contact from './Contact';
import Dashboard from './Dashboard';
import PostProject from './PostProject';
import OverviewPostedProject from './OverviewPostedProject';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Verification from './Verification';
import SpecialistsWelcome1 from './SpecialistWelcome1';
import SpecialistsWelcome2 from './SpecialistWelcome2';
import ClientWelcome from './ClientWelcome';
import ClientProfile from './ClientProfile';
import ClientProjects from './ClientProjects';
import ClientMyTeams from './ClientMyTeams';
import SpecialistsProfile from './SpecialistsProfile';
import SpecialistsMyTeams from './SpecialistsMyTeams';
import SpecialistsAvailability from './SpecialistsAvailability';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/"/>
                        <Route path="/home" component={Dashboard}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/how_it_works" component={Dashboard}/>
                        <Route path="/projects" component={Dashboard}/>
                        <Route path="/specialist_profiles" component={Dashboard}/>
                        <Route path="/contact" component={Dashboard}/>
                        <Route path="/qas" component={Dashboard}/>
                        <Route path="/post_project" component={PostProject}/>
                        <Route path="/project_overview" component={OverviewPostedProject}/>
                        <Route path="/sign_in" component={SignIn}/>
                        <Route path="/forgot_password" component={ForgotPassword}/>
                        <Route path="/sign_up" component={SignUp}/>
                        <Route path="/verification" component={Verification}/>
                        <Route path="/specialists/dashboard/welcome-to-the-village-1" component={SpecialistsWelcome1}/>
                        <Route path="/specialists/dashboard/welcome-to-the-village-2" component={SpecialistsWelcome2}/>
                        <Route path="/specialists/dashboard/profile" component={SpecialistsProfile}/>
                        <Route path="/specialists/dashboard/my_teams" component={SpecialistsMyTeams}/>
                        <Route path="/specialists/dashboard/availability" component={SpecialistsAvailability}/>
                        <Route path="/client/dashboard/welcome-to-the-village" component={ClientWelcome}/>
                        <Route path="/client/dashboard/profile" component={ClientProfile}/>
                        <Route path="/client/dashboard/projects" component={ClientProjects}/>
                        <Route path="/client/dashboard/my_teams" component={ClientMyTeams}/>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
