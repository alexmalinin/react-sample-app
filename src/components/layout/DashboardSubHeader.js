import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SubHeaderLinkWrap from '../forms/renders/SubHeaderLinkWrap';
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader';

import { CLIENT } from '../../constans/constans';

class DashboardSubHeader extends Component {

    renderLinks() {
        const { data, changeUserType } = this.props;

        return changeUserType === CLIENT && 
        data.map((item, index) =>
            <SubHeaderLinkWrap 
                content={item.content}
                url='#'
                className='dashboard addLikSmall'
                key={index}>
                {item.title} 
            </SubHeaderLinkWrap>
        )
    }
 
    render() {

        return (
            <StyledSubHeader projects sidebarCondition dashboardSubHeader>
                <div>
                    <SubHeaderLinkWrap content='Dashboard' url='/dashboard/' className="dashboard active">
                        &nbsp;
                    </SubHeaderLinkWrap>

                    <SubHeaderLinkWrap content='The village' url='the_village' className="dashboard">
                        &nbsp;
                    </SubHeaderLinkWrap>
                    { this.props.theVillage ? 
                        <SubHeaderLinkWrap theVillage content='filter' url='#' className="filterVillage dashboard"/> : null                    
                    }
                    { this.props.theVillage ? 
                        <SubHeaderLinkWrap theVillage content='' url='#' className="arrowVillage dashboard"/> : null                    
                    }
                </div>
                    
                { this.props.dashboard ? 
                    <div className='plusLink'>
                        {this.renderLinks()}
                    </div> :
                    <div>
                        {this.renderLinks()}
                    </div>
                }
                

            </StyledSubHeader>
        )
    }
}

export default connect(
    ({changeUserType}) => ({changeUserType}),
    null
)(DashboardSubHeader);