import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle'
import DvForm from '../styleComponents/DvForm';
import DvButton from '../styleComponents/DvButton'
import confirm from '../decorators/confirm'

class SpecialistsWelcome2 extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <div>
                <HeaderBasic/>
                <DvGrid left="343px" right="340px" bot="50px" grid={"no-pad"}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <DvTitle mTop="80">
                                    Thanks for joining The Village!
                                </DvTitle>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <DvForm>
                                <div style={{height: '200px', marginTop: '100px'}}>some inputs with validations for specialist</div>
                            </DvForm>
                        </Grid.Row>
                    </Grid>
                    <DvButton primary content='CONTINUE'/>
                    <DvForm>
                        <div style={{height: '200px', marginTop: '100px'}}>additional info for specialist</div>
                    </DvForm>
                    <DvButton onClick={confirmAccount} primary content='SAVE'/>
                    {confirm && <Redirect to="/specialists/dashboard/profile"/> }
                </DvGrid>
            </div>
        )
    }
}

export default confirm(SpecialistsWelcome2);