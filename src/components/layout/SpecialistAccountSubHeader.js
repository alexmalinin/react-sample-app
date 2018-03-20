import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';

import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';


class AboutSubHeader extends Component {

    render() {

        return (
            <StyledSubHeader account>
                <div>
                    <SubHeaderLinkWrap content='Account' url='/specialists/dashboard/account' className="accountSub"/>

                    <SubHeaderLinkWrap content='YTD' url='/specialists/dashboard/year_to_date' className="accountSub"/>

                    <SubHeaderLinkWrap content='statements' url='/specialists/dashboard/statement' className="accountSub"/> 
                </div>
            </StyledSubHeader>
        )
    }
}

export default AboutSubHeader;