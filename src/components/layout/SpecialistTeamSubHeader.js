import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class AboutSubHeader extends Component {

    render() {

        return (
            <StyledSubHeader account>
                <div>
                    <SubHeaderLinkWrap content='Teams' url='#' className="teamSubLink"/>

                    <SubHeaderLinkWrap content='' url='#' className="teamSubLink addLink">
                        add team
                    </SubHeaderLinkWrap>
                </div>
                <div>
                    <SubHeaderLinkWrap content='' url='#' className="teamSubLink addLink">
                        add members
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='' url='#' className="teamSubLink addLink">
                        add channel
                    </SubHeaderLinkWrap>
                </div>
                
            </StyledSubHeader>
        )
    }
}

export default AboutSubHeader;