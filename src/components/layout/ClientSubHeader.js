import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';
import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';
import ProgressBars from '../layout/ProgressBar';

class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                 <div className='progressBarsLink'>
                    <SubHeaderLinkWrap content='1' url='/client/dashboard/profile'>
                        My Profile
                        <ProgressBars percents={this.props.percents.profilePercent}/>
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='2' url='/client/dashboard/company'>
                        My Company
                        <ProgressBars percents={this.props.percents.companyPercent}/>
                    </SubHeaderLinkWrap> 

                    <SubHeaderLinkWrap content='3' url='/client/dashboard/billing'>
                        My Billings
                        <ProgressBars percents={this.props.percents.billingPercent}/>
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

export default SubHeader



// <NavLink className="button" to="/client/dashboard/profile">My Profile</NavLink>
//                 <NavLink className="button" to="/client/dashboard/company">My Company</NavLink>
//                 <NavLink className="button" to="/client/dashboard/billing">My Billing</NavLink>
//                 <NavLink className="button" to="/client/dashboard/projects">Projects</NavLink>
//                 <NavLink className="button" to="/client/dashboard/my_teams">My Teams</NavLink>