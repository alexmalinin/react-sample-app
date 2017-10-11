import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import HeaderBasic from '../layout/HeaderBasic';
import {DvTitle} from '../../styleComponents/DvTitles'
import { DvButton } from '../../styleComponents/DvButton'
import confirm from '../../decorators/confirm'
import SpecialistWelcomeResult1 from '../forms/specialistForms/SpecialistWelcomeResult1';
import SpecialistWelcomeForm2 from '../forms/specialistForms/SpecialistWelcomeForm2';
import { Container } from '../../styleComponents/Container'

class SpecialistsWelcome2 extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <div>
                <HeaderBasic/>

                <Container indentBot>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <DvTitle mTop="80">
                                    Thanks for joining The Village!
                                </DvTitle>
                                <p>
                                    To ensure the best experience of the end-client, Digital Village
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

                    <SpecialistWelcomeForm2 onSubmit={this.submit}/>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <DvButton onClick={confirmAccount} primary content='SAVE'/>
                                {confirm && <Redirect to="/specialists/dashboard/profile"/> }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    submit = values => {
        this.props.confirmAccount();
        console.log('values:', values);
    };
}

export default confirm(SpecialistsWelcome2);
