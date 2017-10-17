import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import { Grid, Tab } from 'semantic-ui-react';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import {DvTitleBig} from '../styleComponents/DvTitles';
import StyledSignUpForm from '../styleComponents/StyledSignUpForm'
import Tabs from '../styleComponents/Tabs';
import { userType } from '../actions/actions';
import SignUpFormSpecialist from './forms/specialistForms/SignUpFormSpecialist';
import SignUpFormClient from './forms/clientForms/SignUpFormClient';
import StyledFormHint from '../styleComponents/forms/StyledFormHint';

class SignUp extends Component {

    state = {
        activeTab: 'Specialist',
        confirm: false,
    };

    render() {
        let { confirm, activeTab } = this.state;
        const panes = [
            { menuItem: 'Specialist', render: () =>
                <StyledSignUpForm attached={false}>
                    <SignUpFormSpecialist person={activeTab} onSubmit={this.submit('Specialist')}/>
                </StyledSignUpForm>
            },
            { menuItem: 'Client', render: () =>
                <StyledSignUpForm attached={false}>
                    <SignUpFormClient person={activeTab} onSubmit={this.submit('Client')}/>
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

                            <Grid.Column mobile={16} tablet={9} computer={8}>
                                <Tabs mTop='180' action=''>
                                    <Tab menu={{ text: true }} panes={panes} onClick={this.activeTab} />
                                    { confirm && <Redirect to='/verification'/> }
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

    submit = userType => values => {
        console.log('---userType:',userType);
        console.log('----values:',values);
        this.setState({
            confirm: !this.state.confirm,
        })
    };

    activeTab = ev => {
        let item = ev.target;
        item.classList.contains('item') ? this.props.userType(item.text) : null;
        this.setState({
            activeTab: item.classList.contains('item') ? item.text : this.state.activeTab,
        })
    }

}

export default connect(({form}) => ({form}), {userType})(SignUp);
