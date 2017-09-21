import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle'
import DvForm from '../styleComponents/DvForm';
import DvButton from '../styleComponents/DvButton'
import confirm from '../decorators/confirm'

class ACreationStepFirst extends Component {

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
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <DvForm>
                                <div style={{height: '200px', marginTop: '100px'}}>some inputs with validations for client</div>
                            </DvForm>
                        </Grid.Row>
                    </Grid>
                    <DvButton onClick={confirmAccount} primary content='SAVE & CONTINUE'/>
                    {confirm && <Redirect from="/client/dashboard/welcome-to-the-village" to="/client/dashboard/welcome-to-the-village"/> }
                </DvGrid>
            </div>
        )
    }
}

export default confirm(ACreationStepFirst);