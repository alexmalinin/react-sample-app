import React, { Component } from 'react';
import NavigationLinks from './NavigationLinks';
import AccountLinks from './AccountLinks';
import StyledNavbar from '../../styleComponents/layout/StyledNavbar';

class Navbar extends Component {

    render() {
        return (
            <StyledNavbar>
                <NavigationLinks/>
                <AccountLinks/>
            </StyledNavbar>
        )
    }
}

export default Navbar;
