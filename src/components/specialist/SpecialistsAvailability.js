import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistAvailabilityForm from './Availability/SpecialistAvailabilityForm';
import {DvTitle, DvTitleSmall} from '../../styleComponents/layout/DvTitles'
import { Container, ContainerLarge } from '../../styleComponents/layout/Container'

class SpecialistsAvailability extends Component {

    render() {

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>
                <SubHeader/>
                <Container indentBot indentTop>
                    <DvTitleSmall>Availability</DvTitleSmall>
                    <SpecialistAvailabilityForm onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default SpecialistsAvailability;