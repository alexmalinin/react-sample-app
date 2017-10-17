import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader'

class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                <NavLink className='button' to='/specialists/dashboard/profile'>Profile</NavLink>
                <NavLink className='button' to='/specialists/dashboard/my_teams'>My Teams</NavLink>
                <NavLink className='button' to='/specialists/dashboard/availability'>Availability</NavLink>
            </StyledSubHeader>
        )
    }
}

export default SubHeader
