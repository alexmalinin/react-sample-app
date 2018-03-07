import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader'

class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                <NavLink className="button" to="/client/dashboard/profile">My Profile</NavLink>
                <NavLink className="button" to="/client/dashboard/company">My Company</NavLink>
                <NavLink className="button" to="/client/dashboard/billing">My Billing</NavLink>
                <NavLink className="button" to="/client/dashboard/projects">Projects</NavLink>
                <NavLink className="button" to="/client/dashboard/my_teams">My Teams</NavLink>
            </StyledSubHeader>
        )
    }
}

export default SubHeader
