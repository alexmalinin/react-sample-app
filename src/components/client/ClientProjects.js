import React, { Component } from 'react';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ClientSubHeader';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container'
import RenderProjectCard from './renders/RenderProjectCard';
import {NewTeamBtn} from '../../styleComponents/layout/DvButton';
import StyledClientTeam from '../../styleComponents/StyledClientTeam';
import Navbar from "../layout/Navbar";

class ClientProfile extends Component {

    render() {

        return (
            <StyledClientTeam>
                <HeaderBasic/>

                <SubHeader/>

                <Container indentTop  relative xsNoPadding>
                    <div className='gag'>
                        <h4>
                            Thank you for showing your<br/> interest, our Teams platform <br/>will be coming soon.
                        </h4>
                    </div>
                    <DvTitleSmall fz='28' indentNull xsCenter>My Projects</DvTitleSmall>

                    <div className='flex-wrapper'>
                        <RenderProjectCard/>
                        <RenderProjectCard/>
                        <RenderProjectCard/>
                    </div>
                </Container>

                <Container indentBot>
                    <NewTeamBtn>
                        <NavLink to='/post_project'/>
                        <span>Create a new team</span>
                    </NewTeamBtn>
                </Container>
            </StyledClientTeam>
        )
    }
}

export default ClientProfile;
