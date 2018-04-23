import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderIntro from './layout/HeaderIntro';
import { S_MainContainer } from '../styleComponents/layout/S_MainContainer';
import { Grid, Tab } from 'semantic-ui-react';
import StyledFormHeader from '../styleComponents/StyledFormHeader';
import {DvTitle} from '../styleComponents/layout/DvTitles';
import confirm from '../decorators/confirm';
import { Container, IntroContainer } from '../styleComponents/layout/Container';
import { resetSignUpData } from "../actions/actions";

class ConfirmEmail extends Component {

    render() {
        const { signUpData } = this.props;

        return (
            <main>
                <HeaderIntro/>
                <S_MainContainer>
                  <IntroContainer indentBot>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column className="perspective">
                          <StyledFormHeader borderBottom>
                            <div className="form-title">Confirmation</div>
                            <div className="form-subtitle">Please verify your email adress.</div>
                          </StyledFormHeader>
                          <div className="confirm-msg">
                            <p>A confirmation email has been sent to the folowing email</p>
                            <div>{signUpData ? signUpData.email : localStorage.getItem('user_email')}</div>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </IntroContainer>
                </S_MainContainer>
            </main>
        )
    }

    componentDidMount() {
        this.props.resetSignUpData();
    }
}

export default connect(({signUpData}) => ({signUpData}), {resetSignUpData})(confirm(ConfirmEmail));
