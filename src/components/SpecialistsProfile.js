import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import HeaderBasic from './HeaderBasic';
import SubHeader from './SpecialistsSubHeader';
import DvGrid from '../styleComponents/DvGrid';
import {DvTitle} from '../styleComponents/DvTitles'
import DvForm from '../styleComponents/Tabs';
import DvButton from '../styleComponents/DvButton'

class SpecialistsProfile extends Component {

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
                            <h2>Profile</h2>
                            <br/>
                            some inputs with validations for specialists</div>
                    </DvForm>
                    <DvButton primary content='SAVE & UPDATE'/>
                </DvGrid>
            </div>
        )
    }
}

export default SpecialistsProfile;