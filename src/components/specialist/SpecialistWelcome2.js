import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import HeaderBasic from '../layout/HeaderBasic';
import {DvTitle} from '../../styleComponents/layout/DvTitles'
import { DvButton } from '../../styleComponents/layout/DvButton'
import confirm from '../../decorators/confirm'
import SpecialistWelcomeResult1 from './renders/SpecialistWelcomeResult1';
import SpecialistWelcomeForm2 from './forms/SpecialistWelcomeForm2';
import { Container } from '../../styleComponents/layout/Container'
import { updateSpecStep3, showChosenSkills } from '../../actions/actions'

class SpecialistsWelcome2 extends Component {

    componentWillMount() {
        this.props.showChosenSkills()

    }

    render() {
        const { signUpData, chosenSkills } = this.props;
        let confirm = signUpData ? signUpData.welcomeSpecStep2 : false;
        let { industry_title } = chosenSkills;
        console.log('confirm', confirm);

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
                                <p>You are a <b>{industry_title}</b> working in
                                    <b> [Industry_Area]</b> that specialises in
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <SpecialistWelcomeResult1 chosenSkills={chosenSkills} />

                    <SpecialistWelcomeForm2 onSubmit={this.submit}/>
                    {confirm && <Redirect to="/specialists/dashboard/profile"/> }
                </Container>
            </div>
        )
    }

    submit = values => {
        let { updateSpecStep3, educations, experiences } = this.props;
        updateSpecStep3(values, educations, experiences);
    };
}

export default connect(
    ({ signUpData, chosenSkills, educations, experiences}) => ({signUpData, chosenSkills, educations, experiences}),
    { updateSpecStep3, showChosenSkills }
)(confirm(SpecialistsWelcome2));
