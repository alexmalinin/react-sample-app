import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';
import AddTeamModal from '../modals/AddTeamModal';


class AboutSubHeader extends Component {

    render() {

        return (
            <StyledSubHeader account>
                <div className="teamSubHeader">
                    <SubHeaderLinkWrap content='Teams' url='#' className="teamLink"/>

                    <AddTeamModal />
                </div>              
            </StyledSubHeader>
        )
    }
}

export default AboutSubHeader;