import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StyledHeader from '../../styleComponents/layout/StyledHeader';
import StyledHeaderBasic from '../../styleComponents/layout/StyledHeaderBasic';
import Logotype from './Logotype'
import { ContainerLarge } from '../../styleComponents/layout/Container';
import { Icon } from 'semantic-ui-react';
import Navbar from './Navbar';
import StyledMobileButton from '../../styleComponents/layout/StyledMobileButton';
import { toggleSidebar } from "../../actions/actions";

class Header extends Component {

    render() {
        return (

            <StyledHeaderBasic className='header-basic'>
                <ContainerLarge containerHeader>
                    { /* <Logotype/> */ }
                    { /* <StyledMobileButton onClick={ this.toggleVisibility }>
                        <Icon name='content' />
                    </StyledMobileButton> */ }
                    <a href='/'>
                        <span>Digital Village</span>
                        {/* <img src='/images/logo_basic.png'/> */}
                    </a>
                    <div className="right-links">
                      <NavLink className="button" to='/sign_in'>Sign In</NavLink>
                      <NavLink className="button" to='/sign_up'>Sign Up</NavLink>
                    </div>
                </ContainerLarge>

            { /* <div className='bot-header'>
                <ContainerLarge>
                    <Navbar/>
                </ContainerLarge>
            </div> */ }
            </StyledHeaderBasic>
        )
    }

    toggleVisibility = () => {
        this.props.toggleSidebar();
    }
}

export default connect(null, { toggleSidebar })(Header);
