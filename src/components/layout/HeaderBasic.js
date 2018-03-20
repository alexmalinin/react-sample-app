import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import StyledHeaderBasic from '../../styleComponents/layout/StyledHeaderBasic';
import { ContainerLarge }from '../../styleComponents/layout/Container';

class Header extends Component {

    state = {
        activeItem: 'home',
    };

    

    render() {
        console.log(this.props, 789);
        
        return (
            <StyledHeaderBasic className='header-basic'>
                <ContainerLarge>
                    <a href='/'>
                        <span>Digital Village</span>
                        {/* <img src='/images/logo_basic.png'/> */}
                    </a>
                    <div>
                        <NavLink className='button square' to='#'></NavLink>
                        <NavLink className='button settings' to='#'></NavLink>
                        <NavLink className='button avatar' to='#'></NavLink>
                        <NavLink className='button' to='/specialists/dashboard/profile'>Matt Client</NavLink>
                        <NavLink onClick={this.logOut} className='button logOut' to='/sign_up'></NavLink>
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
