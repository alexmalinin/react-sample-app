import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import { Grid, Tab } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import DvGrid from '../../styleComponents/layout/DvGrid';
import {DvTitleBig} from '../../styleComponents/layout/DvTitles';
import StyledSignUpForm from '../../styleComponents/StyledSignUpForm';
import Tabs from '../../styleComponents/Tabs';
import { postSignUpData, userType } from '../../actions/actions';
import SignUpFormSpecialist from '../specialist/forms/SignUpFormSpecialist';
import SignUpFormClient from '../client/forms/SignUpFormClient';
import StyledFormHint from '../../styleComponents/forms/StyledFormHint';
import { run } from '../../helpers/scrollToElement';

class SignUp extends Component {

    state = {
        confirm: false,
    };

    componentWillMount() {
        localStorage.removeItem('user_email');
        run(0)();
        this.setState({
            confirm: false,
        })
    }

    render() {
        let { confirm }  = this.state;
        const { changeUserType, signUpData } = this.props;
        let { failLogin, Loading } = signUpData || false;
        const activeIndex = changeUserType === 'Specialist' ? 0 : 1;
        const panes = [
            { menuItem: 'Specialist', render: () =>
                <StyledSignUpForm attached={false}>
                    <SignUpFormSpecialist
                        person={changeUserType}
                        failLogin={failLogin}
                        Loading={Loading}
                        onSubmit={this.submit('specialists')}/>
                </StyledSignUpForm>
            },
            { menuItem: 'Client', render: () =>
                <StyledSignUpForm attached={false}>
                    <SignUpFormClient person={changeUserType} failLogin={failLogin} onSubmit={this.submit('customers')}/>
                </StyledSignUpForm>
            },
        ];

        window.state = this.state;

        return (
            <div>
                <HeaderIntro/>
                <DvGrid>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={7} computer={8}>
                                <DvTitleBig mTop='100' fz='' flex='justify'>
                                    sign
                                    <br/>
                                    up/
                                </DvTitleBig>
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={9} computer={8} className="perspective">
                                <Tabs mTop='180' action='' className="relative">
                                    <Tab className={Loading ? "loading content-loading" : 'loading content-load'}
                                        menu={{ text: true }}
                                        panes={panes}
                                        activeIndex={activeIndex}
                                        onTabChange={this.handleTabChange}
                                    />
                                    <div className={Loading ? 'loading frame-load frame': 'frame loading frame-loading'}>
                                        <div>
                                            <img src='/images/preloader.gif'/>
                                        </div>
                                    </div>
                                    { confirm && <Redirect to='/confirm_email'/> }
                                </Tabs>
                                <StyledFormHint>
                                    <span>Already have an account? <Link to='/sign_in'>Log in</Link></span>
                                </StyledFormHint>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }

    // redirect = ref => {
    //     let a = ref ? ref.querySelector('a') : null;
    //     a ? a.click() : null;
    // };

    submit = userType => values => {
        this.props.postSignUpData(userType, values);
    };

    componentWillReceiveProps(nextProps) {
       console.log(nextProps.signUpData);
        if (nextProps.signUpData) {
            if (nextProps.signUpData.id) {
                this.setState({
                    confirm: !this.state.confirm,
                })
            }
        }
    }

    handleTabChange  = (ev, {activeIndex}) => {
        const activeTab = activeIndex === 0 ? 'Specialist' : 'Client';
        this.props.userType(activeTab);
    };
}


export default connect(
    ({form, changeUserType, signUpData}) => ({form, changeUserType, signUpData}),
    {   userType,
        postSignUpData,
    }
)(SignUp);
