import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ClientSubHeader';
import { Grid } from 'semantic-ui-react';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container'
import RenderProjectCard from './renders/RenderProjectCard';
import ClientBusinessForm from './forms/ClientBusinessForm';
import { showClientData, updateClientProfile } from '../../actions/actions';
import {NewTeamBtn} from '../../styleComponents/layout/DvButton';
import StyledClientTeam from '../../styleComponents/StyledClientTeam';
import Navbar from "../layout/Navbar";

class ClientBusiness extends Component {

    componentWillMount() {
        // localStorage.removeItem('user_email');
        // sessionStorage.removeItem('client_step');
        this.props.showClientData();
    }

    render() {

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
                    {/*<S_Message positive profile data-show={renderMessage}>*/}
                        {/*<Message.Header>Success!</Message.Header>*/}
                        {/*<p>Form updated</p>*/}
                    {/*</S_Message>*/}
                    {/*<S_Message negative profile data-show={renderErrorMessage}>*/}
                        {/*<Message.Header>Error!</Message.Header>*/}
                        {/*<p>Something went wrong, please try again</p>*/}
                    {/*</S_Message>*/}
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={12} computer={8}>
                                <DvTitleSmall fz='28' xsCenter>Business</DvTitleSmall>
                                <ClientBusinessForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    // componentWillUpdate(nextProps) {
    //     if (nextProps.clientData) {
    //         console.log(nextProps.clientData)
    //         // if (renderErrorSpec) {
    //         this.fillFields(nextProps.clientData);
    //         // renderErrorSpec = false;
    //         // }
    //     }
    // }

    submit = values => {
        console.log(values)
    }
}

export default connect(({ clientData }) => ({clientData}), {showClientData, updateClientProfile })(ClientBusiness);
