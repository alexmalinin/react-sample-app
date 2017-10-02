import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/ClientSubHeader';
import DvGrid from '../../styleComponents/DvGrid';
import {DvTitle} from '../../styleComponents/DvTitles';
import DvForm from '../../styleComponents/Tabs';

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
                    <DvForm>
                        <div style={{height: '200px', marginTop: '100px'}}>
                            <h2>Projects</h2>
                            <br/>
                            some cards for client
                            <br/>
                            <br/>
                            <br/>
                            <h2>Will coming soon</h2>
                        </div>
                    </DvForm>
                </DvGrid>
            </div>
        )
    }
}

export default ClientProfile;