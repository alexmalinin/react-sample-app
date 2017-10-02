import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid} from 'semantic-ui-react';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import {DvTitle} from '../styleComponents/DvTitles';

class OverviewPostedProject extends Component {

    state = {
        activeTab: 'Specialist',
    };

    render() {

        return (
            <div>
                <HeaderIntro/>
                <DvGrid left="320px" right="265px" grid={"no-pad"}>
                    <DvTitle mTop="137" fz="">
                        Project Overview
                    </DvTitle>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <div style={{height: '200px', marginTop: '100px'}}>
                                    <h2>New Design to be provided</h2>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }
}

export default OverviewPostedProject;