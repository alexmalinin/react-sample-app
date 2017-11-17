import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import {DvTitle} from '../../styleComponents/layout/DvTitles'
import confirm from '../../decorators/confirm'
import SpecialistWelcomeResult1 from './renders/SpecialistWelcomeResult1';
import SpecialistWelcomeForm2 from './forms/SpecialistWelcomeForm2';
import { Container } from '../../styleComponents/layout/Container'
import { updateSpecStep2, getProjectTypes } from '../../actions/actions'
import StyledSpecialistWelcomeForm2 from '../../styleComponents/StyledSpecialistWelcomeForm2'

class SpecialistsWelcome2 extends Component {


    componentWillMount() {
        sessionStorage.removeItem('spec_step1');
        sessionStorage.setItem('spec_step2', true);
        this.props.getProjectTypes()
    }


    render() {
        const { signUpData } = this.props;
        let confirm = signUpData ? signUpData.welcomeSpecStep2 : false;

        return (
            <div>
                <HeaderBasic/>

                <Container indentBot>
                <StyledSpecialistWelcomeForm2>

                        <div className='half-column'>
                            <DvTitle mTop='80'>
                                Thanks for joining The Village!
                            </DvTitle>

                            <p>
                                To ensure the best experience of the end-client, Digital Village
                                have a strict screening process that will often include a phone
                                call to discuss in detail about your experience and to also understand
                                how we can support you further to get the most out of this platform.
                            </p>
                        </div>

                        <SpecialistWelcomeResult1/>

                        <SpecialistWelcomeForm2 onSubmit={this.submit}/>
                        {confirm && <Redirect to='/specialists/dashboard/profile'/> }

                </StyledSpecialistWelcomeForm2>
                </Container>
            </div>
        )
    }

    submit = values => {
        let { updateSpecStep2, educations, experiences } = this.props;
        updateSpecStep2(values, educations, experiences);

    };
}

export default connect(
    ({ signUpData, educations, experiences}) => ({signUpData, educations, experiences}),
    { updateSpecStep2, getProjectTypes }
)(confirm(SpecialistsWelcome2));
