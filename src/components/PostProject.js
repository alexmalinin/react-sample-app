import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import {DvTitleBig} from '../styleComponents/DvTitles';
import DvButton from '../styleComponents/DvButton';
import confirm from '../decorators/confirm';

class PostProject extends Component {

    state = {
        activeTab: 'Specialist',
    };

    render() {
        const { confirm, confirmAccount } = this.props;
        window.state = this.state;

        return (
            <div>
                <HeaderIntro/>
                <DvGrid left="320px" right="265px" grid={"no-pad"}>
                    <DvTitleBig mTop="137" fz="">
                        post
                        <br/>
                        project /
                    </DvTitleBig>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <div style={{height: '200px', marginTop: '100px'}}>
                                    <h2>Post project</h2>
                                </div>
                                <DvButton onClick={confirmAccount} primary content='Continue'/>
                                {confirm && <Redirect to="/project_overview"/> }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }
}

export default confirm(PostProject);