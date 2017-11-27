import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import FlexDirection from '../styleComponents/FlexDirection';
import Home from './Home';
import NotFound from './NotFound';
import Contact from './Contact/Contact';
import PostProject from './PostProject/PostProject';
import OverviewPostedProject from './OverviewPostedProject';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import ForgotPassword from './ResetPassword/ForgotPassword';
import Verification from './Verification/Verification';
import ResetPage from './ResetPassword/ResetPage';
import ConfirmEmail from './ConfirmEmail';
import SpecialistsWelcome1 from './specialist/SpecialistWelcome1';
import SpecialistsWelcome2 from './specialist/SpecialistWelcome2';
import ClientWelcome from './client/ClientWelcome';
import ClientProfile from './client/ClientProfile';
import ClientProjects from './client/ClientProjects';
import ClientMyTeams from './client/ClientMyTeams';
import SpecialistsProfile from './specialist/SpecialistsProfile';
import SpecialistsMyTeams from './specialist/SpecialistsMyTeams';
import SpecialistsAvailability from './specialist/SpecialistsAvailability';
import SpecialistsIndustry from './specialist/SpecialistIndustry';
import SpecialistsInfo from './specialist/SpecialistInfo';
import SpecialistsAbout from './specialist/SpecialistsAbout';
import Footer from './layout/Footer';
import { Segment, Menu, Sidebar } from 'semantic-ui-react';
import NavigationLinks from './layout/NavigationLinks';
import AccountLinks from './layout/AccountLinks';
import StyledSidebar from '../styleComponents/layout/StyledSidebar';

class App extends Component {

    render() {
        const {signUpData, signInReducer, sidebar } = this.props;
        let render_step1 = signInReducer ? signInReducer['isLogIn'] : null;
        let render_this_step1 = sessionStorage.getItem('spec_step1');
        let render_client_step = sessionStorage.getItem('client_step');
        let render_step2 = signUpData ? signUpData['welcomeSpecStep1'] : null;
        let render_this_step2 = sessionStorage.getItem('spec_step2');

        return (
            <Router>
                <div>
                    {/*<Sidebar.Pushable as={ Segment }>*/}
                        {/*<StyledSidebar as={ Menu } animation='push' width='thin' direction='right' visible={ sidebar }*/}
                                 {/*icon='labeled' vertical inverted>*/}
                            {/*<NavigationLinks/>*/}
                            {/*<AccountLinks/>*/}
                        {/*</StyledSidebar>*/}
                        {/*<Sidebar.Pusher>*/}
                            <FlexDirection>
                                <Switch>
                                    <Route exact path='/' render={ () => <Redirect to='/sign_up'/>}/>
                                    <Route path='/home' component={ Home }/>
                                    <Route path='/contact' component={ Contact }/>
                                    <Route path='/how_it_works' component={ NotFound }/>
                                    <Route path='/projects' component={ NotFound }/>
                                    <Route path='/specialist_profiles' component={ NotFound }/>
                                    <Route path='/contact' component={ NotFound }/>
                                    <Route path='/qas' component={ NotFound }/>
                                    <Route path='/post_project' component={ PostProject }/>
                                    <Route path='/project_overview' component={ OverviewPostedProject }/>
                                    <Route path='/sign_in' component={ SignIn }/>
                                    <Route path='/forgot_password' component={ ForgotPassword }/>
                                    <Route path='/sign_up' component={ SignUp }/>
                                    { this.renderToken() }
                                    { this.resetPassword() }
                                    <Route path='/confirm_email' component={ ConfirmEmail }/>

                                    { /*( render_step1 || render_this_step1 ) &&*/
                                        <Route
                                            path='/specialists/dashboard/welcome-to-the-village-1/'
                                            component={SpecialistsWelcome1}
                                        />
                                    }

                                    { /*( render_step2 || render_this_step2 ) &&*/
                                        <Route
                                            path='/specialists/dashboard/welcome-to-the-village-2'
                                            component={SpecialistsWelcome2}
                                        />
                                    }


                                    <Route path='/specialists/dashboard/profile' component={ SpecialistsProfile }/>
                                    <Route path='/specialists/dashboard/my_teams' component={ SpecialistsMyTeams }/>
                                    <Route path='/specialists/dashboard/availability' component={ SpecialistsAvailability }/>
                                    <Route path='/specialists/dashboard/industry' component={ SpecialistsIndustry } />
                                    <Route path='/specialists/dashboard/info' component={ SpecialistsInfo } />
                                    <Route path='/specialists/dashboard/about' component={SpecialistsAbout}/>
                                    {
                                        ( render_step1 || render_client_step ) &&
                                        < Route path='/client/dashboard/welcome-to-the-village/' component={ClientWelcome}/>
                                    }
                                    <Route path='/client/dashboard/profile' component={ClientProfile}/>
                                    <Route path='/client/dashboard/projects' component={ClientProjects}/>
                                    <Route path='/client/dashboard/my_teams' component={ClientMyTeams}/>
                                    <Route path='*' component={NotFound}/>
                                </Switch>
                                <Footer/>
                            </FlexDirection>
                        {/*</Sidebar.Pusher>*/}
                    {/*</Sidebar.Pushable>*/}
                </div>
            </Router>
        );
    }

    resetPassword = () => {
        return <Route key='' path='/api/v1/:user/password_reset/:token'
                   render={ props => <ResetPage {...props}/> }
                />
    }

    renderToken = () => {
        return [
            <Route key='0' path='/api/v1/:user/confirmation/:token'
                   render={ props => <Verification {...props} user='Specialist'/> }
            />,
            <Route key='1' path='/api/v1/:user/confirmation/:token'
                   render={ props => <Verification {...props} user='Client'/> }
            />
        ]
    }
}

export default connect(({signUpData, signInReducer, sidebar}) => ({signUpData, signInReducer, sidebar}))(App);
