import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Grid, Tab } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import { S_MainContainer } from '../../styleComponents/layout/S_MainContainer';
import { IntroContainer } from '../../styleComponents/layout/Container';
import Loader from '../layout/Loader';
import StyledSignUpForm from '../../styleComponents/StyledSignUpForm'
import DvGrid from '../../styleComponents/layout/DvGrid';
import StyledFormHeader from '../../styleComponents/StyledFormHeader';
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
        let { failSignIn, Loading } = signInReducer || false;
        const activeIndex = changeUserType === 'Specialist' ? 0 : 1;
        let confirm = signInReducer;
        const panes = [
            { menuItem: 'Specialist', render: () =>
                <StyledSignUpForm attached={ false }>
                    <SignInForm
                        user="specialists"
                        email={ this.userEmail }
                        failSignIn={ failSignIn }
                        onSubmit={ this.submit }
                    />
                </StyledSignUpForm>
            },
            { menuItem: 'Client', render: () =>
                <StyledSignUpForm attached={ false }>
                    <SignInForm
                        user="customers"
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
                <S_MainContainer>
                  <Loader loading={Loading} />
                  <IntroContainer>
                    <DvGrid>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column className="perspective">
                                    <StyledFormHeader borderBottom>
                                      <div className="form-title">Sign in</div>
                                      <div className="form-subtitle">Welcome back!</div>
                                    </StyledFormHeader>
                                    <Tabs mTop='180' widthAuto action='' className="relative">
                                        <Tab className={Loading ? "loading content-loading" : 'loading content-load'}
                                            menu={{ text: true }}
                                            panes={panes}
                                            activeIndex={activeIndex}
                                            onTabChange={this.handleTabChange}
                                        />
                                    </Tabs>
                                    { confirm && this.loginRedirect()}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </DvGrid>
                  </IntroContainer>
                </S_MainContainer>
            </div>
        )
    }

    loginRedirect = () => {
        let { changeUserType, signInReducer } = this.props;
        let { isLogIn, data } = signInReducer;
        let status = data ? data["status"] : null;
        console.log('signInReducer', signInReducer);
        let user = changeUserType === "Specialist" ? "specialists" : "client";
        if (isLogIn && status !== "logged") {
            return (
              <Redirect to={`/${user}/dashboard/profile`} />
            )
        }

        if (status === "logged") {
            return (
                <Redirect to={`/${user}/dashboard/about`} />
            )
         }
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

export default connect(
    ({changeUserType, signInReducer}) => ({changeUserType, signInReducer}),
    {signIn, userType }
)(SignUp);
