import React, { Component } from 'react';
import HeaderBasic from '../../layout/HeaderBasic';
import SubHeader from '../../layout/SpecialistsSubHeader';
import { DvTitle, DvTitleSmall } from '../../../styleComponents/layout/DvTitles'
import { DvButton } from '../../../styleComponents/layout/DvButton'
import { Container, ContainerLarge } from '../../../styleComponents/layout/Container'
import { S_MainContainer } from '../../../styleComponents/layout/S_MainContainer';
import RenderProjectCard from '../../client/renders/RenderProjectCard';
import StyledClientTeam from '../../../styleComponents/StyledClientTeam';


class SpecialistsMyTeams extends Component {

    render() {

        return (
            <Container indentTop indentBot relative>
                {/*<ContainerLarge>*/}
                <DvTitle mTop='80'>
                    Welcome to The Village!
                </DvTitle>
                {/*</ContainerLarge>*/}
                <div className='gag'>
                    <h4>
                        Thank you for showing your<br/> interest, our Teams platform <br/>will be coming soon.
                    </h4>
                </div>
                <DvTitleSmall fz='28' indentNull xsCenter>My Teams</DvTitleSmall>
                <div className='flex-wrapper indent-top'>
                    <RenderProjectCard/>
                    <RenderProjectCard/>
                    <RenderProjectCard/>
                </div>
                <DvButton primary content='SAVE & UPDATE'/>
            </Container>
        )
    }
}

export default SpecialistsMyTeams;