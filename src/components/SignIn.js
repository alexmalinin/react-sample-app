import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Grid, Button, Tab } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitleBig from '../styleComponents/DvTitleBig';
import DvForm from '../styleComponents/DvForm';
import confirm from '../decorators/confirm';
import { userType } from '../actions/actions';

class SignUp extends Component {

    state = {
        activeTab: 'Specialist',
    };

    render() {
        const { confirm, confirmAccount } = this.props;

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
                                <DvForm className="specialist-form dv-from" mTop="181" action="">
                                    <div style={{height: '200px', marginTop: '100px'}}>
                                        <h2>some inputs</h2>
                                    </div>
                                    <Button className="form-footer"
                                            content='Login'
                                            primary
                                    />
                                </DvForm>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }
}

export default SignUp;