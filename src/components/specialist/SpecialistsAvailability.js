import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import SpecialistAvailabilityForm from '../forms/Availability/SpecialistAvailabilityForm';
import {DvTitle} from '../../styleComponents/DvTitles'
import { Container, ContainerLarge } from '../../styleComponents/Container'

class SpecialistsAvailability extends Component {

    render() {

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop="80">
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>
                <SubHeader/>
                <Container>
                    <h2>SpecialistsAvailability</h2>
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