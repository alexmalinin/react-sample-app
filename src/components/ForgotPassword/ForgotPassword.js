import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import { DvTitleMedium } from '../../styleComponents/layout/DvTitles';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Container } from "../../styleComponents/layout/Container";

class ForgotPassword extends Component {

    render() {

        return (
            <div>
                <HeaderIntro/>
                <Container indentBot indentTop>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <DvTitleMedium mTop='137' fz='' left>
                                    Forgot
                                    <br/>
                                    Password/
                                </DvTitleMedium>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column tablet={16} computer={8}>
                                <ForgotPasswordForm onSubmit={ this.submit }/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    submit = (values) => {
        console.log(values);
    }
}

export default ForgotPassword