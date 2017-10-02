import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import HeaderBasic from './HeaderBasic';
import SubHeader from './SpecialistsSubHeader';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle'
import SpecialistAvailabilityForm from './forms/Availability/SpecialistAvailabilityForm';

class SpecialistsAvailability extends Component {

    render() {

        return (
            <div>
                <HeaderBasic/>
                <DvGrid left="8%">
                    <DvTitle mTop="80">
                        Welcome to The Village!
                    </DvTitle>
                </DvGrid>
                <SubHeader/>
                <DvGrid left="341px" right="340px">
                    <h2>SpecialistsAvailability</h2>

                    <SpecialistAvailabilityForm onSubmit={this.submit}/>

                </DvGrid>
            </div>
        )
    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default SpecialistsAvailability;