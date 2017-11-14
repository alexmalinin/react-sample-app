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

class SignUp extends Component {

    componentWillMount() {
        this.userEmail = localStorage.getItem('user_email');
    }

    render() {
        const { signInReducer, changeUserType } = this.props;
        let { failSignIn } = signInReducer || false;
        const activeIndex = changeUserType === 'Specialist' ? 0 : 1;
        let confirm = signInReducer;
        const panes = [
            { menuItem: 'Specialist', render: () =>
                <StyledSignUpForm attached={ false }>
                    <SignInForm
                        email={ this.userEmail }
                        failSignIn={ failSignIn }
                        onSubmit={ this.submit }
                    />
                </StyledSignUpForm>
            },
            { menuItem: 'Client', render: () =>
                <StyledSignUpForm attached={ false }>
                    <SignInForm
                        email={ this.userEmail }
                        failSignIn={ failSignIn }
                        onSubmit={this.submit}
                    />
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
                                    <Tab
                                        menu={{ text: true }}
                                        panes={panes}
                                        activeIndex={activeIndex}
                                        onTabChange={this.handleTabChange}
                                    />
                                </Tabs>
                                { confirm &&  this.loginRedirect()}
                                <StyledFormHint>
                                    <span>Don't have an account? <Link to='/sign_up'>Sign up</Link></span>
                                </StyledFormHint>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }

    loginRedirect = () => {
        let { changeUserType, signInReducer } = this.props;
        let { isLogIn, data } = signInReducer;
        let status = data ? data["status"] : null;

        let user = changeUserType === "Specialist" ? "specialists" : "client";
        if (isLogIn && status !== "logged") {
            return (
                <Redirect to={`/${user}/dashboard/welcome-to-the-village${user === "specialists" ? "-1" : ''}`}/>
            )
        }

        if (status === "logged") {
            return (
                <Redirect to={`/${user}/dashboard/profile`} />
            )
        }
        // } else {
        //     return (
        //         <Redirect to={`/${user}/dashboard/profile`} />
        //     )
        // }
    };

    submit = values => {
        let { changeUserType } = this.props;
        let user = changeUserType === "Specialist" ? "specialist" : "customer";
        this.props.signIn(user, values)
    };

    handleTabChange  = (ev, {activeIndex}) => {
        const activeTab = activeIndex === 0 ? 'Specialist' : 'Client';
        this.props.userType(activeTab);
    }
}

export default connect((({changeUserType, signInReducer}) => ({changeUserType, signInReducer})), {signIn, userType })(SignUp);
