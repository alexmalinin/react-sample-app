import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';

import HeaderIntro from './HeaderIntro';
import DvGrid from '../styleComponents/DvGrid';
import DvTitleBig from '../styleComponents/DvTitleBig';

class ForgotPassword extends Component {

    render() {

        return (
            <div>
                <HeaderIntro/>
                <DvGrid left="320px" right="265px" grid={"no-pad"}>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <DvTitleBig mTop="137" fz="">
                                    Forgot
                                    <br/>
                                    Password/
                                </DvTitleBig>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DvGrid>
            </div>
        )
    }
}

export default ForgotPassword