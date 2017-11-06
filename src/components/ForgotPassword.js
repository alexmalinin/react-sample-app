import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/layout/DvGrid';
import {DvTitleBig} from '../styleComponents/layout/DvTitles';
import Footer from './layout/Footer';

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
                <Footer/>
            </div>
        )
    }
}

export default ForgotPassword