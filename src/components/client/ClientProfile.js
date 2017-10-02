import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/ClientSubHeader';
import DvGrid from '../../styleComponents/DvGrid';
import {DvTitle} from '../../styleComponents/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';

class ClientProfile extends Component {

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
                    <h2>Profile</h2>
                    <RenderProfileForm onSubmit={this.submit}/>
                </DvGrid>
            </div>
        )
    }

    submit = values => {
        console.log('----values:',values);
    };
}

export default ClientProfile;