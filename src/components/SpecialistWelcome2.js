import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle'
import DvForm from '../styleComponents/Tabs';
import DvButton from '../styleComponents/DvButton'
import confirm from '../decorators/confirm'
import SpecialistWelcomeResult1 from './forms/SpecialistWelcomeResult1';
import SpecialistWelcomeForm2 from './forms/SpecialistWelcomeForm2';

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
                                <p>To ensure the best experience of the end-client, Digital Village
                                    have a strict screening process that will often include a phone
                                    call to discuss in detail about your experience and to also understand
                                    how we can support you further to get the most out of this platform.
                                </p>
                                <h2>What you’ve told us so far /</h2>
                                <p>You are a <b>[experience_level] [Title]</b> working in
                                    <b> [Industry_Area]</b> that specialises in
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <SpecialistWelcomeResult1/>
                    <SpecialistWelcomeForm2/>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <DvButton onClick={confirmAccount} primary content='SAVE'/>
                                {confirm && <Redirect to="/specialists/dashboard/profile"/> }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }
}

export default confirm(SpecialistsWelcome2);