import React, { Component } from 'react';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/ClientSubHeader';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Grid } from 'semantic-ui-react';
import { ContainerLarge } from '../../styleComponents/layout/Container'
import RenderProjectCard from './RenderProjectCard';
import { NewTeamBtn } from '../../styleComponents/layout/DvButton';

class ClientProfile extends Component {

    render() {

        return (
            <div>
                <HeaderBasic/>

                <ContainerLarge>
                    <DvTitle mTop='80'>
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>

                <SubHeader/>

                <ContainerLarge indentBot xsNoPadding>
                    <DvTitle fz='48' mTop='80'>
                        My Projects
                    </DvTitle>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column tablet={16} computer={2} widescreen={3}>
                                <DvTitleSmall fz='28' xsCenter negative>Projects</DvTitleSmall>
                            </Grid.Column>

                            <Grid.Column tablet={16} computer={14} widescreen={13}>
                                <RenderProjectCard/>
                                <RenderProjectCard/>
                                <NewTeamBtn>
                                    <button/>
                                    <span>Create a new team</span>
                                </NewTeamBtn>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </ContainerLarge>
            </div>
        )
    }
}

export default ClientProfile;
