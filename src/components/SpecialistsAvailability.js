import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import SubHeader from './SpecialistsSubHeader';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle'
import DvForm from '../styleComponents/Tabs';
import DvButton from '../styleComponents/DvButton'

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
                    <DvForm>
                        <div style={{height: '200px', marginTop: '100px'}}>
                            <h2>SpecialistsAvailability</h2>
                            <br/>
                            some inputs for Availability</div>
                    </DvForm>
                    <DvButton primary content='SAVE & UPDATE'/>
                </DvGrid>
            </div>
        )
    }
}

export default SpecialistsAvailability;