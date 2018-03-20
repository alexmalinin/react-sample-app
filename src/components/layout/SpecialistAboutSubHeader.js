import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class AboutSubHeader extends Component {

    render() {

        return (
            <StyledSubHeader profile>
                <div>
                    <SubHeaderLinkWrap content='Profile' url='/specialists/dashboard/profile' className='profileLink'>
                        &nbsp;
                    </SubHeaderLinkWrap>
                </div>
                <div>
                    <SubHeaderLinkWrap url='#' className='rightLink arrow'>
                        <span></span>
                        Complete Later
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='3/9' url='#' className='rightLink'>
                        Profile
                    </SubHeaderLinkWrap> 

                    <SubHeaderLinkWrap content='5%' url='#' className='rightLink'>
                        Progress
                    </SubHeaderLinkWrap>   
                </div>
            </StyledSubHeader>
        )
    }
}

export default AboutSubHeader;
