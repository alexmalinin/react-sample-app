import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import DvGrid from '../styleComponents/DvGrid';
import {DvTitle} from '../styleComponents/DvTitles'
import DvForm from '../styleComponents/Tabs';
import DvButton from '../styleComponents/DvButton'
import confirm from '../decorators/confirm'
import ClientWelcomeForm from './forms/ClientWelcomeForm'

class ClientWelcome extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <div>
                <HeaderBasic/>
                <DvGrid left="343px" right="340px" grid={"no-pad"}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <DvTitle mTop="80">
                                    Welcome to The Digital Village!
                                </DvTitle>
                                <p>Please complete your profile so we can better support
                                    and supply you with the most relevant requests.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <ClientWelcomeForm onSubmit={this.submit} />
                    {confirm && <Redirect to="/client/dashboard/profile"/> }
                </DvGrid>
            </div>
        )
    }

    submit = values => {
        this.props.confirmAccount()
        // this.setState({
        //     confirm: !this.state.confirm,
        // })
        console.log('values:', values);
    };
}

export default confirm(ClientWelcome);