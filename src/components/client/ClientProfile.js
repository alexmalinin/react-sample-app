import React, { Component } from 'react';
import { connect } from 'react-redux';
import {change} from 'redux-form';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/ClientSubHeader';
import { Grid } from 'semantic-ui-react'
import { DvTitle , DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { showClientData, updateClientProfile } from '../../actions/actions';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';

class ClientProfile extends Component {

    state = {
        renderMessage: false,
    };


    componentWillMount() {
        localStorage.removeItem('user_email');
        sessionStorage.removeItem('client_step');
        this.props.showClientData();
    }

    render() {
        const { renderMessage } = this.state;

        return (
            <div>
                <HeaderBasic/>

                <ContainerLarge>
                    <DvTitle mTop="80">
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>

                <SubHeader/>

                <Container indentTop indentBot className="relative">
                    <S_Message positive profile data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} computer={8}>
                                <DvTitleSmall fz='28' xsCenter>Profile</DvTitleSmall>
                                <RenderProfileForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.clientData.successProfileId) {
            this.showMessage();
            run(0)();
        }
    }

    showMessage = () => {
        setTimeout( () => {
                return this.setState({
                    renderMessage: false,
                })
            }, 2000
        );

        this.setState({
            renderMessage: true,
        });
    };

    submit = values => {
        this.props.updateClientProfile(values);
    };
}

export default connect(({clientData}) => ({clientData}), {showClientData, updateClientProfile})(ClientProfile);
