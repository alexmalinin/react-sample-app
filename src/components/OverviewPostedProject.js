import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Grid, Button, Tab } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitle from '../styleComponents/DvTitle';
import DvForm from '../styleComponents/DvForm';
import confirm from '../decorators/confirm';
import { userType } from '../actions/actions';

class OverviewPostedProject extends Component {

    state = {
        activeTab: 'Specialist',
    };

    render() {
        const { confirm, confirmAccount } = this.props;

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