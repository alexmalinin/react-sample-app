import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Grid, Tab, Button } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import Tabs from '../styleComponents/Tabs';
import DvTitleBig from '../styleComponents/DvTitleBig';
import SignInForm from './forms/SignInForm';
import { signIn, userType } from '../actions/actions';

class SignUp extends Component {

    state = {
        activeTab: 'Specialist',
    };

    render() {
        const { confirm, confirmAccount } = this.props;
        const panes = [
            { menuItem: 'Specialist', render: () =>
                <Tab.Pane attached={false}>
                    <SignInForm onSubmit={this.submit}/>
                </Tab.Pane>
            },
            { menuItem: 'Client', render: () =>
                <Tab.Pane attached={false} onClick={this.activeTab}>
                    <SignInForm onSubmit={this.submit}/>
                </Tab.Pane>
            },
        ];

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
                                    in/
                                </DvTitleBig>
                            </Grid.Column>
                            <Grid.Column>
                                <Tabs className="specialist-form dv-from" mTop="181" action="">
                                    <Tab menu={{ text: true }} panes={panes} onClick={this.activeTab}/>
                                    { confirm && <Redirect to="/verification"/> }
                                </Tabs>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }

    submit = values => {
        this.props.signIn(values)
    };

    activeTab = ev => {
        let item = ev.target;
        item.classList.contains('item') ? this.props.userType(item.text) : null;
    }
}

export default connect(null, {signIn, userType })(SignUp);