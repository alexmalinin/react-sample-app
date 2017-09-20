import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Segment, Button } from 'semantic-ui-react';

class Header extends Component {

    state = {
        activeItem: 'home',
    }

    render() {
        const { activeItem } = this.state;

        return (
            <header className="header-basic">
                    <div className='top-header'>
                        <img src="images/logo-basic.png"/>
                    </div>
                    <div className='bot-header'>
                        <NavLink className="button" to="/sign_up">sign up</NavLink>
                    </div>
            </header>
        )
    }
}

export default Header
