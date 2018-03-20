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

class SpecialistsMyTeams extends Component {

    render() {

        const {team} = this.props;
        console.log(team, ';l;lm;l')

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
                                    
                                </Grid.Column>
                                <Grid.Column computer={3}>
                                    #Finance
                                </Grid.Column>   
                                <Grid.Column computer={3}>
                                    #Marketing
                                </Grid.Column>   
                                <Grid.Column computer={3}>
                                    Add Chanel
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
                <span className='title'>{content}</span>
            </Grid.Column>
            <Grid.Column computer={2} textAlign='right' floated='right'>
            </Grid.Column>
        </Grid.Row>
    );
}

export default SpecialistsMyTeams;