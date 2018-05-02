import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class AboutSubHeader extends Component {

    render() {

        return (
            <StyledSubHeader account>
                <div>
                    <SubHeaderLinkWrap content='Account' url='/dashboard/account' className="accountSub"/>

                    <SubHeaderLinkWrap content='YTD' url='/dashboard/year_to_date' className="accountSub"/>

                    <SubHeaderLinkWrap content='statements' url='/dashboard/statement' className="accountSub"/> 
                </div>
            </StyledSubHeader>
        )
    }
}

export default AboutSubHeader;