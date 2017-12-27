import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledSubHeader from '../../styleComponents/layout/StyledSubHeader'

class SubHeader extends Component {

    render() {

        return (
            <StyledSubHeader>
                <NavLink className='button' to='/specialists/dashboard/profile'>Account</NavLink>
                {/*<span>|</span>*/}
                <NavLink className='button' to='/specialists/dashboard/my_teams'>My Teams</NavLink>
                {/*<span>|</span>*/}
                <NavLink className='button' to='/specialists/dashboard/availability'>Availability</NavLink>
                {/*<span>|</span>*/}
                <NavLink className='button' to='/specialists/dashboard/industry'>Industry</NavLink>
                {/*<span>|</span>*/}
                <NavLink className='button' to='/specialists/dashboard/info'>Info</NavLink>
                {/*<span>|</span>*/}
                <NavLink className='button' to='/specialists/dashboard/about'>About</NavLink>
                {/*<span>|</span>*/}
                <NavLink className='button' to='/specialists/dashboard/board'>Board</NavLink>
            </StyledSubHeader>
        )
    }
}

export default SubHeader
