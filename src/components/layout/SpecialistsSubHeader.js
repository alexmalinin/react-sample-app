import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader'

class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                <NavLink className='button' to='/specialists/dashboard/profile'>My Profile</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/industry'>My Services</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/company'>My Company</NavLink>
                <span>|</span>
                <NavLink className='button' to='#'>My Billings</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/my_teams'>My Teams</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/info'>Info</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/about'>About</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/board'>Board</NavLink>
                <span>|</span>
                <NavLink className='button' to='/specialists/dashboard/test'>Test</NavLink>
            </StyledSubHeader>
        )
    }
}

export default SubHeader
