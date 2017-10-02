import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/SpecialistsSubHeader';
import DvGrid from '../../styleComponents/DvGrid';
import {DvTitle} from '../../styleComponents/DvTitles'
import DvForm from '../../styleComponents/Tabs';
import DvButton from '../../styleComponents/DvButton'

class SpecialistsMyTeams extends Component {

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
                            <h2>My Teams</h2>
                            <br/>
                            will be comming soon</div>
                    </DvForm>
                    <DvButton primary content='SAVE & UPDATE'/>
                </DvGrid>
            </div>
        )
    }
}

export default SpecialistsMyTeams;