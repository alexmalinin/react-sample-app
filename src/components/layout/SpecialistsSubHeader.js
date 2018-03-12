import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                <div>
                    <SubHeaderLinkWrap content='1' url='/specialists/dashboard/profile'>
                        My Profile
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='2' url='/specialists/dashboard/industry'>
                        My Services
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='3' url='/specialists/dashboard/company'>
                        My Company
                    </SubHeaderLinkWrap> 

                    <SubHeaderLinkWrap content='4' url='#'>
                        My Billings
                    </SubHeaderLinkWrap>                 
                </div>
                <div>
                    <SubHeaderLinkWrap url='#' myClass='rightLink arrow'>
                        <span></span>
                        Complete Later
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='3/9' url='#' myClass='rightLink'>
                        Profile
                    </SubHeaderLinkWrap> 

                    <SubHeaderLinkWrap content='5%' url='#' myClass='rightLink'>
                        Progress
                    </SubHeaderLinkWrap>   
                </div>
            </StyledSubHeader>
        )
    }
}

export default SubHeader