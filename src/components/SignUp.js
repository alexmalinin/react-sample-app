import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import { Grid, Button, Tab } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitleBig from '../styleComponents/DvTitleBig';
import StyledSignUpForm from '../styleComponents/StyledSignUpForm'
import Tabs from '../styleComponents/Tabs';
import confirm from '../decorators/confirm';
import { userType } from '../actions/actions';
import SignUpFormSpecialist from './forms/SignUpFormSpecialist';
import SignUpFormClient from './forms/SignUpFormClient';


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
                <DvGrid left="320px" right="265px" grid={"no-pad"}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <DvTitleBig mTop="137" fz="">
                                    sign
                                    <br/>
                                    up/
                                </DvTitleBig>
                            </Grid.Column>
                            <Grid.Column>
                                <Tabs className="specialist-form dv-from" mTop="181" action="">
                                    <Tab menu={{ text: true }} panes={panes} onClick={this.activeTab} />
                                    { confirm && <Redirect to="/verification"/> }
                                </Tabs>
                                <span className="mt-50">Already have an account? <Link to="/sign_in">Log in</Link></span>
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
