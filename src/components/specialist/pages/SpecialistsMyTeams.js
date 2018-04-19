import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { DvTitle, DvTitleSmall } from '../../../styleComponents/layout/DvTitles'
import { DvButton } from '../../../styleComponents/layout/DvButton'
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container'
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import RenderProjectCard from '../../client/renders/RenderProjectCard';
import StyledClientTeam from '../../../styleComponents/StyledClientTeam';
import SpecialistTeamSubHeader from '../../layout/SpecialistTeamSubHeader';
import StyledTeamPage from '../../../styleComponents/StyledTeamPage';
import { NavLink } from 'react-router-dom';

class SpecialistsMyTeams extends Component {
    setTeamUser() {
        return (
            <div>
                { this.props.team.map((item, index) => {
                    return ( 
                        <div className='team' key={index}>
                            <img src='../../images/uploadImg.png' />
                            <p> {item} </p>
                        </div> )
                    }) 
                }
                <NavLink to='#' className='buttonAdd'></NavLink>
            </div>
        )
    }

    render() {

        return (
            <ContainerLarge>
                <StyledTeamPage>
                    <SpecialistTeamSubHeader />
                    <Container>
                        <Grid>
                            <SectionHeader content='core team'/>
                            <Grid.Row>
                                <Grid.Column computer={3}>
                                    #General
                                    {this.setTeamUser()}
                                </Grid.Column>
                                <Grid.Column computer={3}>
                                    #Finance
                                    {this.setTeamUser()}
                                </Grid.Column>   
                                <Grid.Column computer={3}>
                                    #Marketing
                                    {this.setTeamUser()}
                                </Grid.Column>   
                                <Grid.Column computer={3}>
                                    Add Chanel
                                    <NavLink to='#' className='buttonAdd'></NavLink>
                                </Grid.Column>   
                                <Grid.Column computer={3}>
                                    
                                </Grid.Column>     
                            </Grid.Row>
                        </Grid>
                    </Container>
                </StyledTeamPage>
            </ContainerLarge>
        )
    }
}

function SectionHeader({ content }) {
    return (
        <Grid.Row className='section-header' >
            <Grid.Column computer={6} textAlign='left' floated='left'>
                <p className='title'>{content}</p>
            </Grid.Column>
            <Grid.Column computer={2} textAlign='right' floated='right'>
            </Grid.Column>
        </Grid.Row>
    );
}

export default SpecialistsMyTeams;