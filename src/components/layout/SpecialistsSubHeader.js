import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
 
import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';
import ProgressBars from '../layout/ProgressBar';


import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';

class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                <div className='progressBarsLink'>
                    <SubHeaderLinkWrap content='1' url='/specialists/dashboard/profile'>
                        My Profile
                        <ProgressBars percents={this.props.percents.profilePercent}/>
                        
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='2' url='/specialists/dashboard/industry'>
                        My Services
                        <ProgressBars percents={this.props.percents.industryPercent}/>
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='3' url='/specialists/dashboard/company'>
                        My Company
                        <ProgressBars percents={this.props.percents.companyPercent}/>
                    </SubHeaderLinkWrap> 

                    <SubHeaderLinkWrap content='4' url='/specialists/dashboard/billings'>
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