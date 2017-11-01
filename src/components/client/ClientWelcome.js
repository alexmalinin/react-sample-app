import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import HeaderBasic from '../layout/HeaderBasic';
import DvGrid from '../../styleComponents/layout/DvGrid';
import {DvTitle} from '../../styleComponents/layout/DvTitles';
import ClientWelcomeForm from './forms/ClientWelcomeForm';
import { welcomeClient } from '../../actions/actions';

class ClientWelcome extends Component {

    render() {
        const { signUpData } = this.props;
        let confirm = signUpData ? signUpData.welcomeClient : false;
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
        this.props.welcomeClient(values);
    };
}

export default connect((({signUpData}) => ({signUpData})), {welcomeClient})(ClientWelcome);