import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Grid, Tab } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import StyledSignUpForm from '../../styleComponents/StyledSignUpForm'
import DvGrid from '../../styleComponents/layout/DvGrid';
import Tabs from '../../styleComponents/Tabs';
import { DvTitleBig } from '../../styleComponents/layout/DvTitles';
import SignInForm from './SignInForm';
import { signIn, userType } from '../../actions/actions';
import StyledFormHint from '../../styleComponents/forms/StyledFormHint';
import Footer from '../layout/Footer';


class SignUp extends Component {

    state = {
        activeTab: 'Specialist',
    };

    render() {
        const { signInReducer } = this.props;
        console.log('signIn', signInReducer)
        let confirm = signInReducer ? signInReducer.isLogIn : false
        console.log(confirm);

        const panes = [
            { menuItem: 'Specialist', render: () =>
                <StyledSignUpForm attached={false}>
                    <SignInForm onSubmit={this.submit}/>
                </StyledSignUpForm>
            },
            { menuItem: 'Client', render: () =>
                <StyledSignUpForm attached={false} onClick={this.activeTab}>
                    <SignInForm onSubmit={this.submit}/>
                </StyledSignUpForm>
            },
        ];

        return (
            <div>
                <HeaderIntro/>
                <DvGrid>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={7} computer={8}>
                                <DvTitleBig mTop='100' fz="" flex='justify'>
                                    sign
                                    <br/>
                                    in/
                                </DvTitleBig>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={9} computer={8}>
                                <Tabs mTop='180' action=''>
                                    <Tab menu={{ text: true }} panes={panes} onClick={this.activeTab}/>
                                </Tabs>
                                { confirm &&  this.loginRedirect()}
                                <StyledFormHint>
                                    <span>Don't have an account? <Link to='/sign_up'>Sign up</Link></span>
                                </StyledFormHint>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
                <Footer/>
            </div>
        )
    }

    loginRedirect = () => {
        let { changeUserType } = this.props;
        let user = changeUserType === "Specialist" ? "specialists" : "client";
        return (
            <Redirect to={`/${user}/dashboard/welcome-to-the-village${user === "specialists" ? "-1" : ''}`}/>
        )
    };

    submit = values => {
        let { changeUserType } = this.props;
        let user = changeUserType === "Specialist" ? "specialist" : "customer";
        this.props.signIn(user, values)
    };

    activeTab = ev => {
        let item = ev.target;
        item.classList.contains('item') ? this.props.userType(item.text) : null;
    }
}

export default connect((({changeUserType, signInReducer}) => ({changeUserType, signInReducer})), {signIn, userType })(SignUp);
