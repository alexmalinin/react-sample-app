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
import ConfirmReset from './ResetPassword/ConfirmReset';
import ConfirmEmail from './ConfirmEmail';
import SpecialistsWelcome1 from './specialist/pages/SpecialistWelcome1';
import SpecialistsWelcome2 from './specialist/pages/SpecialistWelcome2';
import ClientDashboard from './client/ClientDashboard';
import ClientWelcome from './client/ClientWelcome';
import ClientProfile from './client/ClientProfile';
import ClientProjects from './client/ClientProjects';
import ClientBilling from './client/ClientBilling';
import ClientMyTeams from './client/ClientMyTeams';
import ClientCompany from './client/ClientCompany';
import SpecialistDashboard from './specialist/pages/SpecialistsDashboard';
import SpecialistsProfile from './specialist/pages/SpecialistsProfile';
import SpecialistsMyTeams from './specialist/pages/SpecialistsMyTeams';
import SpecialistsIndustry from './specialist/pages/SpecialistIndustry';
import SpecialistsAbout from './specialist/pages/SpecialistsAbout';
import Footer from './layout/Footer';
import Sidebar from '../components/layout/Sidebar';
// import { Segment, Menu, Sidebar } from 'semantic-ui-react';
import NavigationLinks from './layout/NavigationLinks';
import AccountLinks from './layout/AccountLinks';
import StyledSidebar from '../styleComponents/layout/StyledSidebar';
<<<<<<< bb18ee4d142781993045e7a9f3db1e820349eaa3
import ProjectsBoard from './ProjectsBoard';
=======
import Dashboard from './Dashboard';
import TheVillage from './TheVillage';
>>>>>>> [feature] implement dashboard subheader

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
                    <Sidebar/>
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
                                    <Route path='/index.html' component={ () => <Redirect to='/sign_up'/> }/>
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
                                    <Route path='/reset_password' component={ ConfirmReset }/>

                                    <Route path='/specialists/dashboard/:page' component={ SpecialistDashboard } />
                                    
                                    <Route path='/client/dashboard/:page' component={ ClientDashboard } />

                                    <Route path='*' component={NotFound}/>
                                </Switch>
                                {/* <Footer/> */}
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
    };

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
