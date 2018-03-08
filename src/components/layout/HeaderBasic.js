import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledHeaderBasic from '../../styleComponents/layout/StyledHeaderBasic';
import { ContainerLarge }from '../../styleComponents/layout/Container';

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    render() {

        return (
            <StyledHeaderBasic className='header-basic'>
                <ContainerLarge>
                    <a href='/'>
                        <span>Digital Village</span>
                        {/* <img src='/images/logo_basic.png'/> */}
                    </a>
                    <div>
                        {/* <NavLink className='button' to='/specialists/dashboard/profile'>My Profile</NavLink>
                        <span> | </span>
                        <NavLink onClick={this.logOut} className='button' to='/sign_up'>Log Out</NavLink> */}
                    </div>
                </ContainerLarge>
            </StyledHeaderBasic>
        )
    }

    logOut = () => {
        localStorage.clear();
        window.location.reload();
    }
}

export default Header
